import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "~components/Layout/ContentLayout";
import ErrorMsg from "~components/Shared/ErrorMsg";
import NoData from "~components/Shared/NoData";
import Loadable from "~components/Shared/Loadable";
import NoticeViewModel from "./Notice.vm";
import { observer } from "mobx-react";
import Typography from "~components/Shared/Typography";
import { RootTabScreenProps } from "types";
import { View } from "react-native";
import { SETTING_SCREEN_NAME } from "constants/SCREEN_NAME";
import { getRootViewModel } from "~components/Screens/VmManager";

const NoticeScreen = ({
  navigation,
}: RootTabScreenProps<typeof SETTING_SCREEN_NAME.NOTICE>) => {
  const vm = getRootViewModel<NoticeViewModel>(
    (viewModel) => viewModel.tab.Notice
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
      </View>
    </ContentLayout>
  );
};

export default observer(NoticeScreen);
