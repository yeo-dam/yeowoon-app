import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Likes from "./Likes";
import Map from "./Map";
import Setting from "./Setting";
import User from "./Users";
import MyPageDetail from "./Detail";
import MyPageMain from "./MyPage.Main";
import { MYPAGE_SCREEN_NAME } from "constants/SCREEN_NAME";
import { Pressable } from "react-native";
import { RootTabScreenProps } from "types";
import BackLogo from "~assets/Icons/Back.svg";
import Interval from "~components/Shared/Interval";
import styled from "styled-components/native";
import Typography from "~components/Shared/Typography";

export type BnbCreateNavigator = {
  [MYPAGE_SCREEN_NAME.MAIN]: undefined;
  [MYPAGE_SCREEN_NAME.DETAIL]: undefined;
  [MYPAGE_SCREEN_NAME.LIKE]: undefined;
  [MYPAGE_SCREEN_NAME.MAP]: undefined;
  [MYPAGE_SCREEN_NAME.SETTING]: undefined;
  [MYPAGE_SCREEN_NAME.USER]: undefined;
};

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MYPAGE_SCREEN_NAME.MAIN>) => {
  const Stack = createNativeStackNavigator<BnbCreateNavigator>();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={MYPAGE_SCREEN_NAME.MAIN}
    >
      <Stack.Screen name={MYPAGE_SCREEN_NAME.MAIN} component={MyPageMain} />
      <Stack.Screen
        name={MYPAGE_SCREEN_NAME.DETAIL}
        component={MyPageDetail}
        options={{
          headerShown: true,
          headerLeft: () => {
            return (
              <>
                <Pressable
                  onPress={() => navigation.navigate(MYPAGE_SCREEN_NAME.MAIN)}
                >
                  <BackLogo />
                </Pressable>
                <Interval width="12px" />
                <CommentHeaderTypo></CommentHeaderTypo>
              </>
            );
          },
          headerTitle: "",
        }}
      />
      <Stack.Screen name={MYPAGE_SCREEN_NAME.LIKE} component={Likes} />
      <Stack.Screen name={MYPAGE_SCREEN_NAME.MAP} component={Map} />
      <Stack.Screen name={MYPAGE_SCREEN_NAME.SETTING} component={Setting} />
      <Stack.Screen name={MYPAGE_SCREEN_NAME.USER} component={User} />
    </Stack.Navigator>
  );
};

export default MyPageScreen;

const CommentHeaderTypo = styled(Typography).attrs({
  variant: "subhead-regular",
})``;
