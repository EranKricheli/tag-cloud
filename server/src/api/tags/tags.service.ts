import { Word } from './payload/index';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { parse, TextNode } from 'node-html-parser';

const extractWords = (rawHtml: string) => {
  const parsedHtml = parse(rawHtml);
  return parsedHtml
    .querySelector('#classname')
    .childNodes.filter((child) => child instanceof TextNode)
    .map((child) => {
      return child.rawText;
    });
};

const remapWordsFreqs = (wordsFrequencies: { [word: string]: number }) => {
  const wordCloud: Array<Word> = [];
  for (const [text, value] of Object.entries(wordsFrequencies)) {
    if (text) {
      wordCloud.push({ text, value });
    }
  }

  return wordCloud;
};

@Injectable()
export class TagsService {
  async getClassName(limit: number) {
    const WORDS_RESOURCE_URL = 'http://ClassNamer.org';
    const requests = [];
    for (let i = 0; i < limit; i++) {
      requests.push(
        fetch(WORDS_RESOURCE_URL).then((res) =>
          res.text().then((text) => extractWords(text)),
        ),
      );
    }

    const result = await Promise.all(requests);
    const wordsFrequencies: { [word: string]: number } = {};
    result.flat().forEach((word: string) => {
      if (!(word in wordsFrequencies)) {
        wordsFrequencies[word] = 0;
      }

      wordsFrequencies[word] += 1;
    });

    return remapWordsFreqs(wordsFrequencies);
  }
}
