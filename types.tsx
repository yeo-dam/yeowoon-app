import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  SignIn: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Main: undefined;
  Search: undefined;
  Comment: undefined;
  Detail: { id: string };
  Map: undefined;
  CreateMain: undefined;
  CreatePost: undefined;
  CreateStory: undefined;
  CreateSearch: undefined;
  ImageUpload: undefined;
  MyPageMain: undefined;
  MyPageLikes: undefined;
  MyPageDetail: undefined;
  MyPageSetting: undefined;
  MyPageMap: undefined;
  MyPageUser: undefined;
  SettingMain: undefined;
  SettingEvent: undefined;
  SettingNotice: undefined;
  SettingNotification: undefined;
  SettingPolicy: undefined;
  SettingProfileEdit: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
