import PlaceType from "~domain/enum/PlaceType";

function PlaceTypeFormatter(type: PlaceType) {
  switch (type) {
    case PlaceType.PUB:
      return "술집";
    case PlaceType.CAFE:
      return "카페";
    case PlaceType.HOTEL:
      return "호텔";
    case PlaceType.SHOP:
      return "상점";
    case PlaceType.ACTIVITY:
      return "아웃도어";
    case PlaceType.RESTAURANT:
      return "식당";
    case PlaceType.TOURIST_DESTIONATION:
      return "여행지";
    default:
      break;
  }
}

export default PlaceTypeFormatter;
