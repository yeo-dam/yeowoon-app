import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import PlaceType from "~domain/enum/PlaceType";

class PlaceModel {
  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  placeName: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(PlaceType)
  @IsNotEmpty()
  placeType: PlaceType;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsNumber()
  likeCount?: number;
}

export default PlaceModel;
