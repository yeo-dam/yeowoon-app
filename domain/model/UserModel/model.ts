import { Type } from "class-transformer";
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";
import TransformDate from "helper/transformDate";
import UserEntity from "../../../data/entity/UserEntity";
import ProviderType from "../../enum/ProviderType";
import UserMbtiType from "../../enum/UserMbtiType";
import ImageFileModel from "../ImageFileModel";

export default class UserModel implements UserEntity {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

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
  avatar?: ImageFileModel;
}
