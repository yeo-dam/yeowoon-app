import PlaceType from "~domain/enum/PlaceType";
import MapListModel from ".";

export const genMapListMockObject = (
  latitude = 37.29972304408989,
  longitude = 126.81528244167568
): MapListModel => {
  return {
    placeId: "1",
    title: "marker1",
    description: "marker1 description",
    latitude,
    longitude,
    image: "https://picsum.photos/375/346",
    likeCount: 5,
  };
};

export const markers: MapListModel[] = [
  {
    placeId: "1",
    latitude: 37.2993867,
    longitude: 126.4354486,
    title: "Amazing Food Place",
    description: "This is the best food place",
    image: "https://picsum.photos/375/346",
    likeCount: 4,
  },
  {
    placeId: "2",
    latitude: 37.2945648,
    longitude: 126.8177279,
    title: "Second Amazing Food Place",
    description: "This is the second best food place",
    image: "https://picsum.photos/375/346",
    likeCount: 5,
  },
  {
    placeId: "3",
    latitude: 37.2981662,
    longitude: 126.8110113,
    title: "Third Amazing Food Place",
    description: "This is the third best food place",
    image: "https://picsum.photos/375/346",
    likeCount: 3,
  },
  {
    placeId: "4",
    latitude: 37.2941137,
    longitude: 126.8197463,
    title: "Fourth Amazing Food Place",
    description: "This is the fourth best food place",
    image: "https://picsum.photos/375/346",
    likeCount: 4,
  },
  {
    placeId: "5",
    latitude: 37.2992757,
    longitude: 126.814781,
    title: "Fifth Amazing Food Place",
    description: "This is the fifth best food place",
    image: "https://picsum.photos/375/346",
    likeCount: 4,
  },
];
