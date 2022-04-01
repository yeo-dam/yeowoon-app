import { IsNotEmpty, IsString } from "class-validator";

export default class FindPostDto {
  @IsString()
  @IsNotEmpty()
  placeName: string;
}
