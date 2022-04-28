import PlaceType from "~domain/enum/PlaceType";

export const genPlaceMockObject = (
  latitude = 37.28972304408989,
  longitude = 126.81528244167568
) => {
  return {
    id: "1",
    name: "place",
    title: "marker1",
    description: "marker1 description",
    type: PlaceType.CONVINIENCE,
    latitude,
    longitude,
  };
};
