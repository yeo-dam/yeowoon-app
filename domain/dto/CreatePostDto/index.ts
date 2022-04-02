import { Exclude, Transform, Type } from "unsafe-class-transformer";
import {
  ArrayNotEmpty,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { PickType } from "helper/mappedTypes";
import PlaceModel from "~domain/model/PlaceModel/model";
import PostModel from "~domain/model/PostModel";

class Place extends PickType(PlaceModel, ["type"]) {}
class CreatePostDto extends PickType(PostModel, ["description"]) {
  @MinLength(8, { message: "YYYY.DD.MM 형태로 입력해주세요" })
  @IsString()
  @IsNotEmpty()
  inputDateTime: string;

  @IsString()
  @IsOptional()
  date?: string;

  @Type(() => Place)
  @IsNotEmpty()
  place: Place;

  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsNotEmpty()
  tags: string[];

  images: number[];
}

export default CreatePostDto;
