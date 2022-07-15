import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetCloudInput {
  @Field({ defaultValue: 100 })
  limit?: number;
}
