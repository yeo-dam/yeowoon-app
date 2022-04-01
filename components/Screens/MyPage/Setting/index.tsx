import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./Setting.Main";
import Event from "./Event";
import Notice from "./Notice";
import Notification from "./Notification";
import Policy from "./Policy";
import ProfileEdit from "./ProfileEdit";
import { SETTING_SCREEN_NAME } from "constants/SCREEN_NAME";

export type BnbSettingNavigator = {
  [SETTING_SCREEN_NAME.MAIN]: undefined;
  [SETTING_SCREEN_NAME.EVENT]: undefined;
  [SETTING_SCREEN_NAME.NOTICE]: undefined;
  [SETTING_SCREEN_NAME.NOTIFICATION]: undefined;
  [SETTING_SCREEN_NAME.POLICY]: undefined;
  [SETTING_SCREEN_NAME.PROFILE_EDIT]: undefined;
};

const MainScreen = () => {
  const Stack = createNativeStackNavigator<BnbSettingNavigator>();

  return (
    <Stack.Navigator initialRouteName={SETTING_SCREEN_NAME.MAIN}>
      <Stack.Screen name={SETTING_SCREEN_NAME.MAIN} component={Main} />
      <Stack.Screen name={SETTING_SCREEN_NAME.EVENT} component={Event} />
      <Stack.Screen name={SETTING_SCREEN_NAME.NOTICE} component={Notice} />
      <Stack.Screen
        name={SETTING_SCREEN_NAME.NOTIFICATION}
        component={Notification}
      />
      <Stack.Screen name={SETTING_SCREEN_NAME.POLICY} component={Policy} />
      <Stack.Screen
        name={SETTING_SCREEN_NAME.PROFILE_EDIT}
        component={ProfileEdit}
      />
    </Stack.Navigator>
  );
};

export default MainScreen;
