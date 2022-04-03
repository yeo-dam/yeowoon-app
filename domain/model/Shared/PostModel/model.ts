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
import PostEntity from "~data/entity/PostEntity";
import ImageFileModel from "~domain/model/Shared/ImageFileModel/model";
import PlaceModel from "~domain/model/Shared/PlaceModel";
import UserModel from "~domain/model/Shared/UserModel";
import CommentModel from "~domain/model/Shared/CommentModel";
import { Type } from "unsafe-class-transformer";
import TransformDate from "helper/transformDate";
import TagModel from "../TagModel";

class PostModel implements PostEntity {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @ValidateNested()
  @Type(() => UserModel)
  @IsNotEmpty()
  user: UserModel;

  @ValidateNested()
  @Type(() => PlaceModel)
  @IsNotEmpty()
  place: PlaceModel;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @TransformDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @TransformDate()
  @IsOptional()
  updatedAt?: Date;

  @ValidateNested({ each: true })
  @Type(() => ImageFileModel)
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  imageLocations: ImageFileModel[];

  @IsBoolean()
  @IsNotEmpty()
  like: boolean;

  @ValidateNested({ each: true })
  @Type(() => CommentModel)
  @IsArray()
  @IsOptional()
  comments?: CommentModel[];

  @ValidateNested({ each: true })
  @Type(() => TagModel)
  @IsOptional()
  tags?: TagModel[];

  @IsNumber()
  @IsNotEmpty()
  likeCount: number;

  @IsNumber()
  @IsNotEmpty()
  commentCount: number;
}

export default PostModel;
