import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Word {
  @Field()
  text: string;

  @Field()
  value: number;
}

@ObjectType()
export class GetWordCloudPayload {
  @Field(() => [Word])
  data: Array<Word>;
}
