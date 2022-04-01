import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Likes from "./Likes";
import Map from "./Map";
import Setting from "./Setting";
import User from "./Users";
import MyPageMain from "./MyPage.Main";
import { MYPAGE_SCREEN_NAME } from "constants/SCREEN_NAME";

export type BnbCreateNavigator = {
  [MYPAGE_SCREEN_NAME.MAIN]: undefined;
  [MYPAGE_SCREEN_NAME.LIKE]: undefined;
  [MYPAGE_SCREEN_NAME.MAP]: undefined;
  [MYPAGE_SCREEN_NAME.SETTING]: undefined;
  [MYPAGE_SCREEN_NAME.USER]: undefined;
};

const CreateScreen = () => {
  const Stack = createNativeStackNavigator<BnbCreateNavigator>();

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={MYPAGE_SCREEN_NAME.MAIN}
    >
      <Stack.Screen name={MYPAGE_SCREEN_NAME.MAIN} component={MyPageMain} />
      <Stack.Screen name={MYPAGE_SCREEN_NAME.LIKE} component={Likes} />
      <Stack.Screen name={MYPAGE_SCREEN_NAME.MAP} component={Map} />
      <Stack.Screen name={MYPAGE_SCREEN_NAME.SETTING} component={Setting} />
      <Stack.Screen name={MYPAGE_SCREEN_NAME.USER} component={User} />
    </Stack.Navigator>
  );
};

export default CreateScreen;
