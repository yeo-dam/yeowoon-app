import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import PlaceType from "../../enum/PlaceType";

class PlaceModel {
  @IsNumber()
  @IsNotEmpty()
  placeId: number;

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
  type: PlaceType;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  address: string;
}

export default PlaceModel;
