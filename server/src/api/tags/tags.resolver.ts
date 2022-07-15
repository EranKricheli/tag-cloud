import { GetCloudInput } from './inputs/get-cloud.input';
import { GetWordCloudPayload } from './payload/index';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { TagsService } from './tags.service';

@Resolver()
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Query(() => GetWordCloudPayload)
  async getCloud(
    @Args('params', { defaultValue: { limit: 100 } }) params?: GetCloudInput,
  ) {
    return { data: await this.tagsService.getClassName(params.limit) };
  }
}
