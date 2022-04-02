import React, { FC, useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import * as ImagePicker from "expo-image-picker";
import { FlatList, Text, View } from "react-native";
import { Orientation } from "expo-screen-orientation";
import * as MediaLibrary from "expo-media-library";
import ImageTile from "./ImageTile";
import styled from "styled-components/native";
import Typography from "../Typography";

type MediaType = ["audio" | "photo" | "video" | "unknown"];
type SortBy = [
  | "default"
  | "mediaType"
  | "width"
  | "height"
  | "creationTime"
  | "modificationTime"
  | "duration"
];
interface getPhotoParams extends Record<string, any> {
  first: number;
  mediaType: MediaType;
  sortBy: SortBy;
}

type Props = {
  max: number;
  callbackHandler: (data: Promise<MediaLibrary.Asset[]>) => void;
  onChange: (data: number, func: () => void) => void;
  loadCount?: number;
  mediaType?: MediaType;
  sortBy?: SortBy;
  loadCompleteMetadata?: boolean;
};

const ImageBrowser: FC<Props> = ({
  max,
  onChange,
  callbackHandler,
  loadCount = 50,
  mediaType = [MediaLibrary.MediaType.photo],
  sortBy,
  loadCompleteMetadata = false,
}) => {
  const [hasCameraPermission, setHasCameraPermission] =
    useState<boolean>(false);
  const [hasCameraRollPermission, setHasCameraRollPermission] =
    useState<boolean>(false);
  const [numColumns, setNumColumns] = useState<number | undefined>(undefined);
  const [after, setAfter] = useState<any | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const getPermissionsAsync = async () => {
    // 카메라 접근 권한 요청
    const { status: cameraPermission } =
      await ImagePicker.requestCameraPermissionsAsync();

    // 카메라 앨범 접근 권한 요청
    const { status: cameraRollPermission } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    setHasCameraPermission(cameraPermission === "granted");
    setHasCameraRollPermission(cameraRollPermission === "granted");
  };

  const getOrientationAsync = async () => {
    // 현재 스크린 방향을 불러옴
    const orientation: Orientation =
      await ScreenOrientation.getOrientationAsync();
    return orientation;
  };

  const getNumColumns = (orientation: Orientation) => {
    const { PORTRAIT_UP, PORTRAIT_DOWN } = ScreenOrientation.Orientation;
    // 세로일 땐 최대 4개까지, 가로일 땐 최대 7개까지 나열
    const isPortrait =
      orientation === PORTRAIT_UP || orientation === PORTRAIT_DOWN;
    return isPortrait ? 4 : 7;
  };

  const onOrientationChange = (orientationInfo: any) => {
    //  ScreenOrientation.removeOrientationChangeListener();
    ScreenOrientation.addOrientationChangeListener(onOrientationChange);
    const numColumns = getNumColumns(orientationInfo.orientation);
    setNumColumns(numColumns);
  };

  const processPhotos = async (
    data: MediaLibrary.PagedInfo<MediaLibrary.Asset>
  ) => {
    if (data.totalCount) {
      if (after === data.endCursor) return;
      const assets = data.assets;
      const newAssets: MediaLibrary.Asset[] = [];
      for (const asset of assets) {
        const { localUri } = await MediaLibrary.getAssetInfoAsync(asset);
        if (localUri) {
          newAssets.push({
            ...asset,
            uri: localUri,
          });
        }
      }
      setPhotos([...photos, ...newAssets]);
      setAfter(data.endCursor);
      setHasNextPage(data.hasNextPage);
    } else {
      setIsEmpty(true);
    }
  };

  const getItemLayout = () => {};

  const renderImageTile = ({
    item,
    index,
  }: {
    item: MediaLibrary.Asset;
    index: number;
  }) => {
    const IsSelected = selected.indexOf(index) !== -1;
    const selectedItemNumber = selected.indexOf(index) + 1;

    const renderSelectedComponent = (number: number) => {
      return (
        <CountBox>
          <CountTypo>{number}</CountTypo>
        </CountBox>
      );
    };

    return (
      <ImageTile
        selectedItemNumber={selectedItemNumber}
        item={item}
        index={index}
        selected={IsSelected}
        selectImage={selectImage}
        renderSelectedComponent={renderSelectedComponent}
        // renderExtraComponent={renderExtraComponent}
      />
    );
  };

  const selectImage = (index: number) => {
    let newSelected = Array.from(selected);

    if (newSelected.indexOf(index) === -1) {
      newSelected.push(index);
    } else {
      const deleteIndex = newSelected.indexOf(index);
      newSelected.splice(deleteIndex, 1);
    }
    if (newSelected.length > max) return;
    if (!newSelected) newSelected = [];
    setSelected(newSelected);
  };

  const prepareCallback = () => {
    const selectedPhotos = selected.map((i) => photos[i]);
    if (!loadCompleteMetadata) {
      callbackHandler(Promise.all(selectedPhotos));
    } else {
      const assetsInfo = Promise.all(
        selectedPhotos.map((i) => MediaLibrary.getAssetInfoAsync(i))
      );
      callbackHandler(assetsInfo);
    }
  };

  useEffect(() => {
    onChange(selected.length, () => prepareCallback());
  }, [selected]);

  const getPhotos = () => {
    const params: getPhotoParams = {
      first: loadCount,
      mediaType,
      sortBy: [MediaLibrary.SortBy.creationTime],
    };

    if (after) {
      params.after = after;
    }
    if (!hasNextPage) return;
    MediaLibrary.getAssetsAsync(params).then(processPhotos);
  };

  useEffect(() => {
    async function InitAsync() {
      getPermissionsAsync();
      ScreenOrientation.addOrientationChangeListener(onOrientationChange);
      const orientation = await getOrientationAsync();
      const numColumns = getNumColumns(orientation);
      setNumColumns(numColumns);
      getPhotos();
    }
    InitAsync();
  }, []);

  return (
    <Wrapper>
      <FlatList
        data={photos}
        numColumns={numColumns}
        key={numColumns}
        renderItem={renderImageTile}
      />
    </Wrapper>
  );
};

export default ImageBrowser;

const Wrapper = styled.View`
  flex: 1;
`;

const CountBox = styled(View)`
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
  height: 24px;
  border-radius: 24px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary.main};
`;

const CountTypo = styled(Typography)`
  font-weight: bold;
  align-items: center;
  color: ${({ theme }) => theme.colors.background.paper};
`;
