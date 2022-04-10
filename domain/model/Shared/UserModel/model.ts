import { Type } from "unsafe-class-transformer";
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import TransformDate from "helper/transformDate";
import ImageFileModel from "../ImageFileModel";
import UserMbtiType from "~domain/enum/UserMbtiType";
import ProviderType from "~domain/enum/ProviderType";
import UserEntity from "~data/entity/UserEntity";

export default class UserModel implements UserEntity {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsOptional()
  introduction?: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserMbtiType)
  @IsNotEmpty()
  userType: UserMbtiType;

  @IsDate()
  @TransformDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsEnum(ProviderType)
  @IsOptional()
  providerType?: ProviderType;

  @Type(() => ImageFileModel)
  @IsOptional()
  userImage?: ImageFileModel;
}
