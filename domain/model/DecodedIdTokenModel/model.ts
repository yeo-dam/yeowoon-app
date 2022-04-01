import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import ProviderType from "~domain/enum/ProviderType";
import RoleType from "~domain/enum/RoleType";

export default class Model {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @IsNotEmpty()
  exp: Date;

  @IsDate()
  @IsNotEmpty()
  iat: Date;

  @IsEnum(ProviderType)
  @IsNotEmpty()
  provider: ProviderType;

  @IsEnum(RoleType)
  @IsNotEmpty()
  role: RoleType;

  @IsNumber()
  @IsNotEmpty()
  sub: number;

  @IsString()
  @IsNotEmpty()
  username: string;
}
