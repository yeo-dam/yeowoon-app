import { IsNotEmpty, IsString } from "class-validator";

export default class PlaceSearchDto {
  @IsString()
  @IsNotEmpty()
  keyword: string;
}