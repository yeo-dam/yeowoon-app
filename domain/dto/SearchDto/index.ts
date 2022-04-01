import { IsNotEmpty, IsString } from "class-validator";

export default class QueryDto {
  @IsString()
  @IsNotEmpty()
  placeName: string;
}
