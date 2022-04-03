import PlaceType from "domain/enum/PlaceType";

export default interface Entity {
  placeId: string;
  placeType: PlaceType;
  placeName: string;
  address: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}
