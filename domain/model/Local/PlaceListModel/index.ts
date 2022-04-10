import { IsNotEmpty, IsString } from "class-validator";
import PlaceEntity from "~data/entity/PlaceEntity";

export type PlaceListJson = Pick<
  PlaceEntity,
  "placeId" | "placeName" | "address"
>;

export default class PlaceListModel implements PlaceListJson {
  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  placeName: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
