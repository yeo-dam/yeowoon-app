import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import TransformDate from "helper/TransformDate";
import PostModel from "../PostModel/model";

class DiaryModel {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @Type(() => PostModel)
  @IsNotEmpty()
  posts: PostModel[];

  @IsDate()
  @TransformDate()
  @IsNotEmpty()
  createAt: Date;

  @IsDate()
  @TransformDate()
  @IsOptional()
  updatedAt?: Date;
}

export default DiaryModel;
