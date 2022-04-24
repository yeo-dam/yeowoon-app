import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreatePost from "./Post";
import ImageUpload from "./Post/ImageUpload";
import { InputAccessoryView, Pressable, View } from "react-native";
import { CREATE_SCREEN_NAME, MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import Typography from "components/Shared/Typography";
import CreatePostViewModel from "./Post/CreatePost.vm";
import styled from "styled-components/native";
import Interval from "~components/Shared/Interval";
import { observer } from "mobx-react";
import Flex from "~components/Shared/FlexBox";
import Search from "./Post/Search";
import Input from "~components/Shared/Input";
import Form from "~components/Shared/Form";
import FindPostDto from "~domain/dto/FindPostDto";
import { useCallback, useState } from "react";
import { runInAction } from "mobx";
import theme from "themes";
import Button from "~components/Shared/Button";
import PlaceSearchDto from "~domain/dto/PlaceSearchDto";
import CloseLogo from "~assets/Icons/Close.svg";
import BackPushLogo from "~assets/Icons/Back.svg";
import SearchLogo from "~assets/Icons/SearchIcon.svg";
import { getRootViewModel } from "../VmManager";
import SearchForm from "~components/Local/SearchForm";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import FindPlaceDto from "~domain/dto/FindPlaceDto";

export type BnbCreateNavigator = {
  [CREATE_SCREEN_NAME.POST]: undefined;
  [CREATE_SCREEN_NAME.STORY]: undefined;
  [CREATE_SCREEN_NAME.UPLOAD]: undefined;
  [CREATE_SCREEN_NAME.SEARCH]: undefined;
};

const CreateScreen = ({ navigation }: any) => {
  const Stack = createNativeStackNavigator<BnbCreateNavigator>();
  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );
  const form = useForm({
    resolver: classValidatorResolver(FindPlaceDto),
    mode: "onChange",
    reValidateMode: "onSubmit",
  });

  const handleClick = useCallback(
    (bool: boolean) => {
      runInAction(() => vm.setFront(bool));
    },
    [vm.isFront]
  );

  const onSubmit = async (inputTextValue: string) => {
    const findDto: PlaceSearchDto = {
      keyword: inputTextValue,
    };

    runInAction(() => vm.setSearchWord(inputTextValue));

    await vm.findPlaces({
      query: findDto,
    });
  };

  const handleBackToMain = () => {
    // 업로드된 이미지와 선택된 장소 정보를 지워준다.
    runInAction(() => {
      if (vm.uploadedImages || vm.selectedPlace) {
        vm.resetUploadImages();
        vm.resetSelctedPlace();
      }
      vm.formReset(true);
    });
    // 홈 화면으로 이동한다.
    navigation.navigate(MAIN_SCREEN_NAME.HOME);
  };

  return (
    <Stack.Navigator initialRouteName={CREATE_SCREEN_NAME.POST}>
      <Stack.Screen
        name={CREATE_SCREEN_NAME.POST}
        component={CreatePost}
        options={{
          headerShown: true,
          headerLeft: () => (
            <Pressable onPress={handleBackToMain}>
              <CloseLogo />
            </Pressable>
          ),
          headerRight: () => (
            <HeaderView>
              <Pressable onPress={() => handleClick(true)}>
                <CreateHeaderTypo isFront={vm.isFront}>앞면</CreateHeaderTypo>
              </Pressable>
              <Interval width="7px" />
              <Pressable onPress={() => handleClick(false)}>
                <CreateHeaderTypo isFront={!vm.isFront}>뒷면</CreateHeaderTypo>
              </Pressable>
            </HeaderView>
          ),
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name={CREATE_SCREEN_NAME.UPLOAD}
        component={ImageUpload}
        options={{
          headerTitle: "",
          headerLeft: () => {
            return (
              <Pressable onPress={() => navigation.pop()}>
                <BackPushLogo />
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name={CREATE_SCREEN_NAME.SEARCH}
        component={Search}
        options={{
          headerTitle: "",
          headerLeft: () => {
            return (
              <SearchForm
                form={form}
                handleNavigate={() =>
                  navigation.navigate(CREATE_SCREEN_NAME.POST)
                }
                onSubmit={onSubmit}
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default observer(CreateScreen);

const CreateHeaderTypo = styled(Typography).attrs({
  variant: "subhead-regular",
})<{ isFront: boolean }>`
  color: ${({ isFront, theme }) =>
    isFront ? theme.colors.grey.black : theme.colors.grey[99]};
`;

const HeaderView = styled(Flex)``;

const SearchBox = styled(Flex)`
  flex: 1;
  height: 40px;
  margin-right: 42.5px;
  align-items: center;
  padding: 12px;
  background-color: #f9f9f9;
  border: 1px solid grey;
  border-radius: 15px;
`;

const IconBox = styled.View`
  margin-right: 8px;
`;
