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
import PlaceModel from "~domain/model/Shared/PlaceModel/model";
import PostModel from "~domain/model/Shared/PostModel";
import PlaceType from "~domain/enum/PlaceType";

class Place extends PickType(PlaceModel, ["placeId", "placeName"]) {
  type: PlaceType;
}
class CreatePostDto extends PickType(PostModel, ["description"]) {
  @MinLength(8, { message: "YYYY.DD.MM 형태로 입력해주세요" })
  @IsString()
  @IsNotEmpty()
  inputDateTime: string;

  @IsString()
  @IsOptional()
  date?: string;

  // submit 시 validating
  place: Place;

  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsNotEmpty()
  tags: string[];

  // submit 시 validating
  images: number[];
}

export default CreatePostDto;
