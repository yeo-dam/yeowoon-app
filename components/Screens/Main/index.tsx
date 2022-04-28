import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./index.Main";
import Comment from "./Comment";
import { Pressable, TouchableWithoutFeedback, Text } from "react-native";
import Typography from "~components/Shared/Typography";
import styled from "styled-components/native";
import Interval from "~components/Shared/Interval";
import CommentViewModel from "./Comment/Comment.vm";
import { useEffect } from "react";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import { getRootViewModel } from "../VmManager";
import BackLogo from "~assets/Icons/Back.svg";
import Search from "./Search";
import Form from "~components/Shared/Form";
import SearchForm from "~components/Local/SearchForm";
import PlaceSearchDto from "~domain/dto/PlaceSearchDto";
import { RootTabScreenProps } from "types";
import Map from "./Map";
import { runInAction } from "mobx";
import Detail from "./Detail";

export type MainNavigator = {
  [MAIN_SCREEN_NAME.HOME]: undefined;
  [MAIN_SCREEN_NAME.COMMENT]: undefined;
  [MAIN_SCREEN_NAME.DETAIL]: undefined;
  [MAIN_SCREEN_NAME.MAP]: undefined;
  [MAIN_SCREEN_NAME.SEARCH]: undefined;
};

const MainScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.HOME>) => {
  const Stack = createNativeStackNavigator<MainNavigator>();
  const vm = getRootViewModel<CommentViewModel>(
    (viewModel) => viewModel.tab.Comment
  );

  // useEffect(() => {
  //   async function loadComments() {
  //     await vm.load({
  //       pageNum: 0,
  //     });
  //   }
  //   // loadComments();
  // }, []);

  const handleSearchKeyword = async (inputTextValue: string) => {
    const findDto: PlaceSearchDto = {
      keyword: inputTextValue,
    };

    // TODO : 추후 작업 필요
    // runInAction(() => vm.setSearchWord(inputTextValue));
    // await vm.findPlaces({
    //   query: findDto,
    // });
  };

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={MAIN_SCREEN_NAME.HOME}
    >
      <Stack.Screen name={MAIN_SCREEN_NAME.HOME} component={Main} />
      <Stack.Screen name={MAIN_SCREEN_NAME.DETAIL} component={Detail} />
      <Stack.Screen
        name={MAIN_SCREEN_NAME.SEARCH}
        component={Search}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <SearchForm
              handleNavigate={() => navigation.navigate(MAIN_SCREEN_NAME.HOME)}
              onSubmit={handleSearchKeyword}
            />
          ),
        }}
      />
      <Stack.Screen
        name={MAIN_SCREEN_NAME.COMMENT}
        options={{
          headerShown: true,
          headerLeft: () => {
            return (
              <>
                <Pressable
                  onPress={() => navigation.navigate(MAIN_SCREEN_NAME.HOME)}
                >
                  <BackLogo />
                </Pressable>
                <Interval width="12px" />
                <CommentHeaderTypo>
                  댓글 {vm.comments.length}개
                </CommentHeaderTypo>
              </>
            );
          },
          headerTitle: "",
        }}
        component={Comment}
      />
      <Stack.Screen name={MAIN_SCREEN_NAME.MAP} component={Map} />
    </Stack.Navigator>
  );
};

export default MainScreen;

const CommentHeaderTypo = styled(Typography).attrs({
  variant: "subhead-regular",
})``;
