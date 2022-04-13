import * as React from "react";
import Image from "~components/Shared/Image";
import { observer } from "mobx-react";
import Typography from "components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { ActivityIndicator, View } from "react-native";
import FormLayout from "~components/Layout/FormLayout";
import CreatePostViewModel from "../CreatePost.vm";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import ImageBrowser from "~components/Shared/ImageBrowser";
import { Asset } from "expo-media-library";
import FlexBox from "~components/Shared/FlexBox";
import { getRootViewModel } from "~components/Screens/VmManager";

const Component = ({
  navigation,
}: RootTabScreenProps<typeof CREATE_SCREEN_NAME.UPLOAD>) => {
  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );

  const _getHeaderLoader = () => {
    return <ActivityIndicator size="small" color={"#0580FF"} />;
  };

  const ImagesCallback = (callback: Promise<Asset[]>) => {
    navigation.setOptions({
      headerRight: () => _getHeaderLoader(),
    });

    callback
      .then(async (photos: Asset[]) => {
        for (let photo of photos) {
          let localUri = photo.uri;
          let filename = photo.filename;
          let match = localUri.match(/&ext=(\w+)$/);
          let type = match ? `image/${match[1]}` : `image`;

          const formdata: FormData = new FormData();
          const imageObj: any = {
            name: filename,
            uri: localUri,
            type,
          };

          formdata.append("images", imageObj);

          const uploaded = await vm.uploadImages({
            body: formdata,
          });

          navigation.navigate(CREATE_SCREEN_NAME.POST);
        }
      })
      .catch((e: any) => console.log(e));
  };

  const _renderDoneButton = (count: number, onSubmit: () => void) => {
    if (!count) return null;
    return (
      <ImageUploadHeader onPress={onSubmit}>
        <>
          <PurpleText>{count}장</PurpleText>
          <SubTitleText onPress={onSubmit}>선택완료</SubTitleText>
        </>
      </ImageUploadHeader>
    );
  };

  const updateHandler = (count: number, onSubmit: () => void) => {
    navigation.setOptions({
      headerRight: () => _renderDoneButton(count, onSubmit),
    });
  };

  return (
    <FormLayout>
      <View>
        <ImageBrowser
          max={3}
          onChange={updateHandler}
          callbackHandler={ImagesCallback}
        />
      </View>
    </FormLayout>
  );
};

export default observer(Component);

const Wrapper = styled.View<{ isFront?: boolean }>`
  margin: 0 auto;
  background-color: ${({ isFront }) => (isFront ? "#fff" : "#121212")};
  width: 351px;
  height: 526px;
`;

const ImageUploadSection = styled(View)`
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 32px;
  width: 319px;
  height: 390px;
  background-color: ${({ theme }) => theme.colors.grey.ED};
`;

const SubTitleText = styled(Typography).attrs({
  variant: "subhead-regular",
})``;

const PurpleText = styled(SubTitleText)`
  color: ${({ theme }) => theme.colors.primary.main};
  margin-right: 4px;
`;

const ImageUploadHeader = styled.TouchableWithoutFeedback`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NoImageComponent = styled(Image)``;

const InnerWrapper = styled.TouchableWithoutFeedback`
  width: 100%;
  height: 100%;
`;
