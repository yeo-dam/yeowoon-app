import { IsNotEmpty, IsNumber } from "class-validator";
import PagerEntity from "~data/entity/PagerEntity";
export default class PagerModel implements PagerEntity {
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsNotEmpty()
  count: number;

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  offset: number;
}
