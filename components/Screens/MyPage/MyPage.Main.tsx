import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~components/Layout/ContentLayout";
import ErrorMsg from "~components/Shared/ErrorMsg";
import Loadable from "~components/Shared/Loadable";
import MyPageViewModel from "./MyPage.vm";
import { observer } from "mobx-react";
import Typography from "~components/Shared/Typography";
import TouchableIcon from "~components/Shared/TouchableIcon";
import { View } from "react-native";
import { MYPAGE_SCREEN_NAME } from "constants/SCREEN_NAME";
import { RootTabScreenProps } from "types";
import { getRootViewModel } from "../VmManager";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MYPAGE_SCREEN_NAME.MAIN>) => {
  const vm = getRootViewModel<MyPageViewModel>(
    (viewModel) => viewModel.tab.MyPage
  );

  useEffect(() => {
    async function loadPosts() {
      await vm.load();
    }
    loadPosts();
  }, []);

  if (vm.isLoading) {
    return <Loadable />;
  }

  if (vm.isError) {
    return <ErrorMsg />;
  }

  return (
    <ContentLayout title="Tab Three">
      <View>
        <Typography>마이페이지</Typography>
        <TouchableIcon onPress={() => navigation.navigate("Map")}>
3        </TouchableIcon>
      </View>
    </ContentLayout>
  );
};

export default observer(MyPageScreen);
