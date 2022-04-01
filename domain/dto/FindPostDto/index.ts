import { IsNumber, IsOptional } from "class-validator";

export default class FindDto {
  @IsNumber()
  @IsOptional()
  pageNum?: number;
}
