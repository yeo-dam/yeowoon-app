import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./index.Main";
import Comment from "./Comment";
import Map from "../MyPage/Map";
import { TouchableWithoutFeedback } from "react-native";
import Typography from "~components/Shared/Typography";
import styled from "styled-components/native";
import Interval from "~components/Shared/Interval";
import CommentViewModel from "./Comment/Comment.vm";
import { useEffect } from "react";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import { getRootViewModel } from "../VmManager";
import BackLogo from "~assets/Icons/Back.svg";
import Search from "./Search";

export type BnbMainNavigator = {
  [MAIN_SCREEN_NAME.HOME]: undefined;
  [MAIN_SCREEN_NAME.COMMENT]: undefined;
  [MAIN_SCREEN_NAME.MAP]: undefined;
  [MAIN_SCREEN_NAME.SEARCH]: undefined;
};

const MainScreen = ({ navigation }: any) => {
  const Stack = createNativeStackNavigator<BnbMainNavigator>();
  const vm = getRootViewModel<CommentViewModel>(
    (viewModel) => viewModel.tab.Comment
  );

  useEffect(() => {
    async function loadComments() {
      await vm.load({
        pageNum: 0,
      });
    }
    // loadComments();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={MAIN_SCREEN_NAME.HOME}
    >
      <Stack.Screen name={MAIN_SCREEN_NAME.HOME} component={Main} />
      <Stack.Screen
        name={MAIN_SCREEN_NAME.COMMENT}
        options={{
          headerShown: true,
          headerLeft: () => {
            return (
              <>
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate("Main")}
                >
                  <BackLogo />
                </TouchableWithoutFeedback>
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
      <Stack.Screen name={MAIN_SCREEN_NAME.SEARCH} component={Search} />
    </Stack.Navigator>
  );
};

export default MainScreen;

const CommentHeaderTypo = styled(Typography).attrs({
  variant: "subhead-regular",
})``;
