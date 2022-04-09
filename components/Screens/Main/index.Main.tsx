import * as React from "react";
import { FlatList, View } from "react-native";
import { useEffect } from "react";
import ContentLayout from "~components/Layout/ContentLayout";
import NoData from "~components/Shared/NoData";
import ErrorMsg from "~components/Shared/ErrorMsg";
import Loadable from "~components/Shared/Loadable";
import MainViewModel from "./Main.vm";
import { observer } from "mobx-react";
import Carousel from "~components/Shared/Carousel";
import MainItemCard from "~components/Local/MainItemCard";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Nav from "~components/Shared/Nav";
import { RootTabScreenProps } from "types";
import { getRootViewModel } from "../VmManager";
import PostListModel from "~domain/model/Local/PostListModel";

const SafeAreaHeightForIos = getStatusBarHeight();

const MainScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.HOME>) => {
  const vm = getRootViewModel<MainViewModel>((viewModel) => viewModel.tab.Main);

  async function loadPosts(pageNum: number) {
    await vm.load({
      pageNum,
    });
  }

  useEffect(() => {
    loadPosts(0);
  }, []);

  const renderList = () => {
    if (vm.posts && vm.posts.length === 0) {
      return <NoData />;
    } else {
      return (
        <FlatList<PostListModel>
          data={vm.posts}
          ListHeaderComponent={
            <>
              <NavSection>
                <Nav navigation={navigation} />
              </NavSection>
              {/* TODO : MainImage 및 Text 반영되도록 변경 필요 */}
              <Carousel
                aspectRatio={375 / 346}
                pages={[
                  { id: "1", url: "https://picsum.photos/375/346" },
                  { id: "2", url: "https://picsum.photos/375/346" },
                ]}
                isTextImg={false}
              />
            </>
          }
          renderItem={({ item }) => (
            <MainItemCard vm={vm} item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.postId}
          // onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          // onRefresh={handleRefresh}
        ></FlatList>
      );
    }
  };

  // const handleLoadMore = () => {
  //   const limitNum = vm.pager.limit;
  //   const pagerNum = vm.pager.offset + vm.pager.limit;
  //   loadPosts(limitNum, pagerNum);
  // };

  const handleRefresh = () => {
    console.log("이 지점에서부터 refresh 합니다.");
  };

  return (
    <ContentLayout>
      <View>{renderList()}</View>
    </ContentLayout>
  );
};

export default observer(MainScreen);

const NavSection = styled.View`
  position: absolute;
  top: ${SafeAreaHeightForIos + "px"};
  right: 0;
  z-index: 1;
`;
