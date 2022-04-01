import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "components/Layout/ContentLayout";
import ErrorMsg from "components/Shared/ErrorMsg";
import NoData from "components/Shared/NoData";
import Loadable from "components/Shared/Loadable";
import UserListViewModel from "./UserList.vm";
import { observer } from "mobx-react";
import Typography from "components/Shared/Typography";
import { View } from "react-native";
import { getRootViewModel } from "~components/Screens/VmManager";
import { RootTabScreenProps } from "types";

const UserListScreen = ({ navigation }: RootTabScreenProps<"MyPageUser">) => {
  const vm = getRootViewModel<UserListViewModel>(
    (viewModel) => viewModel.tab.User
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
        <Typography>유저목록 페이지</Typography>
      </View>
    </ContentLayout>
  );
};

export default observer(UserListScreen);
