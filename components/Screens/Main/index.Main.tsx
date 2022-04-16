import * as React from "react";
import { FlatList, View } from "react-native";
import { useEffect } from "react";
import ContentLayout from "~components/Layout/ContentLayout";
import NoData from "~components/Shared/NoData";
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
import Typography from "~components/Shared/Typography";

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

  const addLikes = async (postId: string, userId: string) => {
    await vm.addLikes(postId, userId);
  };

  const deleteLikes = async (postId: string, userId: string) => {
    await vm.deleteLikes(postId, userId);
  };

  const renderCard = (item: PostListModel) => {
    if (vm.posts && vm.posts.length === 0) {
      return <NoData />;
    } else {
      return (
        <MainItemCard
          item={item}
          isLoading={vm.isLoading}
          addLikes={addLikes}
          deleteLikes={deleteLikes}
          navigation={navigation}
        />
      );
    }
  };

  const renderList = () => {
    return (
      <FlatList<PostListModel>
        data={vm.posts}
        ListHeaderComponent={
          <Wrapper>
            <NavSection>
              <Nav navigation={navigation} />
            </NavSection>
            {/* TODO : MainImage 및 Text 반영되도록 변경 필요 */}
            <TypoSection>
              <Title>감성 가득, </Title>
              <Title>겨울을 품은 </Title>
              <Title>일본 대표 5곳 </Title>
            </TypoSection>
            <Carousel
              navigation={navigation}
              aspectRatio={375 / 346}
              pages={[
                { id: "1", url: "https://picsum.photos/375/346" },
                { id: "2", url: "https://picsum.photos/375/346" },
              ]}
              isTextImg={false}
            />
          </Wrapper>
        }
        renderItem={({ item }) => renderCard(item)}
        keyExtractor={(item) => item.postId}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        // onRefresh={handleRefresh}
      ></FlatList>
    );
    // }
  };

  const handleLoadMore = () => {
    loadPosts(1);
  };

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

const Wrapper = styled.View`
  position: relative;
`;

const NavSection = styled.View`
  position: absolute;
  top: ${SafeAreaHeightForIos + "px"};
  right: 0;
  z-index: 1;
`;

const TypoSection = styled.View`
  position: absolute;
  left: 32;
  bottom: 53;
  z-index: 1;
`;

const Title = styled(Typography).attrs({
  variant: "headline-bold",
})`
  color: ${({ theme }) => theme.colors.background.paper};
`;
