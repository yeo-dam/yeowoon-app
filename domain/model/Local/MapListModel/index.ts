import { PickType } from "helper/mappedTypes";
import PlaceModel from "~domain/model/Shared/PlaceModel/model";

export default class MapListModel extends PickType(PlaceModel, [
  "placeId",
  "latitude",
  "longitude",
  "title",
  "description",
  "image",
  "likeCount",
]) {}
