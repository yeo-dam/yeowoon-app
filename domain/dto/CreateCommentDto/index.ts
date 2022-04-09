import { IsNotEmpty, IsString } from "class-validator";

export default class QueryDto {
  @IsString()
  @IsNotEmpty()
  comment: string;
}
