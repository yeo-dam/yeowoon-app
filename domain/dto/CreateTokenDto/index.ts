import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import ProviderType from "~domain/enum/ProviderType";

export default class CreateTokenDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;

  @IsEnum(ProviderType)
  @IsNotEmpty()
  provider: ProviderType;
}
