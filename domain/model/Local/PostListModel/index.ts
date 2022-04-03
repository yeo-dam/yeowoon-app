import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import PlaceModel from "~domain/model/Shared/PlaceModel";
import UserModel from "~domain/model/Shared/UserModel";
import CommentModel from "~domain/model/Shared/CommentModel";
import { Type } from "unsafe-class-transformer";
import TransformDate from "helper/transformDate";
import { PickType } from "helper/mappedTypes";
import PostModel from "~domain/model/Shared/PostModel";

class _UserModel extends PickType(UserModel, [
  "userId",
  "userName",
  "userImage",
]) {}

class _PlaceModel extends PickType(PlaceModel, [
  "placeId",
  "placeName",
  "placeType",
]) {}

class PostListModel extends PickType(PostModel, ["postId", "title"]) {
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsNotEmpty()
  imageLocations: string[];

  @ValidateNested({ each: true })
  @Type(() => _UserModel)
  @IsNotEmpty()
  user: _UserModel;

  @ValidateNested({ each: true })
  @Type(() => _PlaceModel)
  @IsNotEmpty()
  place: _PlaceModel;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @ValidateNested({ each: true })
  @Type(() => CommentModel)
  @IsArray()
  @IsOptional()
  comments?: CommentModel[];

  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsBoolean()
  @IsNotEmpty()
  like: boolean;

  @IsNumber()
  @IsNotEmpty()
  likeCount: number;

  @IsNumber()
  @IsNotEmpty()
  commentCount: number;
}

export default PostListModel;
