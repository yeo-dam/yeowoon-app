import { Type } from "unsafe-class-transformer";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import CommentEntity from "~data/entity/CommentEntity";
import UserModel from "../UserModel/model";

class CommentModel implements CommentEntity {
  @IsString()
  @IsNotEmpty()
  commentId: string;

  @IsDate()
  @IsNotEmpty()
  createdDateTime: Date;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => UserModel)
  @IsNotEmpty()
  user: UserModel;

  @IsNumber()
  @IsNotEmpty()
  likeCount: number;

  @IsBoolean()
  @IsNotEmpty()
  isGroup: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isWriter: boolean;
}

export default CommentModel;
