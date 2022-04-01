import { IsNotEmpty, IsNumber } from "class-validator";

export default class QueryDto {
  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  offset: number;
}
