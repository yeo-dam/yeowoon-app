import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { PickType } from "helper/mappedTypes";
import { Type } from "unsafe-class-transformer";
import UserEntity from "~data/entity/UserEntity";
import UserModel from "~domain/model/Shared/UserModel/model";

interface _UserJson
  extends Pick<
    UserEntity,
    "userId" | "userName" | "userImage" | "introduction"
  > {}

export interface UserDetailJson {
  user: _UserJson;
  introduction?: string;
  postCount?: number;
  bookmarkCount?: number;
  followerCount?: number;
  followingCount?: number;
}

class _UserModel extends PickType(UserModel, [
  "userId",
  "userName",
  "userImage",
  "introduction",
]) {}

export default class UserDetailModel implements UserDetailJson {
  @ValidateNested({ each: true })
  @Type(() => _UserModel)
  @IsNotEmpty()
  user: _UserModel;

  @IsNumber()
  @IsOptional()
  postCount?: number;

  @IsNumber()
  @IsOptional()
  bookmarkCount?: number;

  @IsNumber()
  @IsOptional()
  followerCount?: number;

  @IsNumber()
  @IsOptional()
  followingCount?: number;
}
