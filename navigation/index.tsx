import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Text, View } from "react-native";

import MyPageScreen from "~components/Screens/MyPage";
import CreateScreen from "~components/Screens/Create";

import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "~components/Screens/ModalScreen";
import NotFoundScreen from "~components/Screens/NotFoundScreen";
import SignInScreen from "~components/Screens/SignInScreen";
import TabTwoScreen from "~components/Screens/TabTwoScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { BNB_SCREEN_NAME } from "constants/SCREEN_NAME";
import MainScreen from "~components/Screens/Main";
import styled from "styled-components/native";
import Typography from "~components/Shared/Typography";
import FeedLogo from "~assets/Icons/Navigation/Feed/Feed.svg";
import ClickedFeedLogo from "~assets/Icons/Navigation/Feed/Feed_clicked.svg";
import ClickedCreateLogo from "~assets/Icons/Navigation/Create/Create_clicked.svg";
import CreateLogo from "~assets/Icons/Navigation/Create/Create.svg";
import ClickedSettingLogo from "~assets/Icons/Navigation/Setting/Setting_clicked.svg";
import SettingLogo from "~assets/Icons/Navigation/Setting/Setting.svg";
import { getRootViewModel } from "~components/Screens/VmManager";
import { useModalContext } from "./modalContext";

export default function Navigation({
  colorScheme,
  setToken,
}: {
  colorScheme: ColorSchemeName;
  setToken: (data: string) => void;
}) {
  const { isModalOpen, openModal, closeModal } = useModalContext();

  return (
    // FIXME : Linking Config 수정하기
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <ModalContainer onPress={closeModal}>
        <RootNavigator setToken={setToken} />
        {isModalOpen && <ModalBackground />}
      </ModalContainer>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator({ setToken }: { setToken: (data: string) => void }) {
  const authVm = getRootViewModel((vm) => vm.auth);
  const accessToken = authVm.auth?.accessToken;

  console.log(`TCL ~ [index.tsx] ~ line ~ 70 ~ accessToken`, accessToken);
  return (
    <Stack.Navigator>
      {!accessToken && (
        <Stack.Screen name="SignIn" options={{ headerShown: false }}>
          {(props) => <SignInScreen {...props} setToken={setToken} />}
        </Stack.Screen>
      )}
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export type BnbMainNavigator = {
  [BNB_SCREEN_NAME.MAIN]: undefined;
  [BNB_SCREEN_NAME.CREATE]: undefined;
  [BNB_SCREEN_NAME.MYPAGE]: undefined;
};

const BottomTab = createBottomTabNavigator<BnbMainNavigator>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName={BNB_SCREEN_NAME.MAIN}
      backBehavior="order"
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name={BNB_SCREEN_NAME.MAIN}
        component={MainScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <BottomBarTypo isClicked={focused}>피드</BottomBarTypo>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? <ClickedFeedLogo /> : <FeedLogo />,
        }}
      />
      <BottomTab.Screen
        name={BNB_SCREEN_NAME.CREATE}
        component={CreateScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <BottomBarTypo isClicked={focused}>입력</BottomBarTypo>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ClickedCreateLogo />
            ) : (
              <CreateBtnBox>
                <CreateLogo />
              </CreateBtnBox>
            ),
        }}
      />
      <BottomTab.Screen
        name={BNB_SCREEN_NAME.MYPAGE}
        component={MyPageScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <BottomBarTypo isClicked={focused}>마이</BottomBarTypo>
          ),
          tabBarIcon: ({ focused }) =>
            focused ? <ClickedSettingLogo /> : <SettingLogo />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const CreateBtnBox = styled.View`
  padding-top: 8px;
`;

const BottomBarTypo = styled(Typography).attrs({
  textSize: "10px",
})<{
  isClicked: boolean;
}>`
  color: ${({ theme, isClicked }) =>
    isClicked ? theme.colors.primary.sub : theme.colors.grey.AA};
`;

const ModalContainer = styled.Pressable`
  flex: 1;
  height: 100%;
`;

const ModalBackground = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grey.black};
  opacity: 0.7;
  flex: 1;
  width: 100%;
  height: 100%;
`;
