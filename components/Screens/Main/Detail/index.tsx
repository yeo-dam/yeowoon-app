import React, { FC, useEffect } from "react";
import styled from "styled-components/native";
import { Pressable, View } from "react-native";
import { RootTabScreenProps } from "types";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import MainItemCard from "~components/Local/MainItemCard";
import { getRootViewModel } from "~components/Screens/VmManager";
import DetailViewModel from "./Detail.vm";
import { windowWidth } from "constants/Layout";
import Typography from "~components/Shared/Typography";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Nav from "~components/Shared/Nav";
import FlexBox from "~components/Shared/FlexBox";
import BackLogo from "~assets/Icons/Back_white.svg";
import Interval from "~components/Shared/Interval";

type Props = {};

const SafeAreaHeightForIos = getStatusBarHeight();

const Component = ({
  navigation,
  route,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.DETAIL>) => {
  const vm = getRootViewModel<DetailViewModel>(
    (viewModel) => viewModel.tab.Detail
  );

  async function loadPost(postId: string) {
    await vm.load();
  }

  useEffect(() => {
    loadPost("");
  }, []);

  const addLikes = async (postId: string, userId: string) => {
    await vm.addLikes(postId, userId);
  };

  const deleteLikes = async (postId: string, userId: string) => {
    await vm.deleteLikes(postId, userId);
  };

  return (
    <Wrapper>
      <Header>
        <NavSection>
          <FlexBox>
            <InnerWrapper>
              <Pressable
                onPress={() => navigation.navigate(MAIN_SCREEN_NAME.HOME)}
              >
                <BackLogo />
              </Pressable>
            </InnerWrapper>
          </FlexBox>
        </NavSection>
        <TypoSection>
          <TitleSection>
            <HeaderTitle>감성 가득, </HeaderTitle>
            <HeaderTitle>겨울을 품은 </HeaderTitle>
            <HeaderTitle>일본 대표 5곳 </HeaderTitle>
          </TitleSection>
          <TagSection>
            <Tag>#해쉬태그 </Tag>
            <Tag>#입력하는 </Tag>
            <Tag>#공간 </Tag>
          </TagSection>
        </TypoSection>
        <PageItem>
          <ImageItem
            source={{ uri: "https://picsum.photos/375/346" }}
            style={{ aspectRatio: 375 / 346 }}
          />
        </PageItem>
      </Header>
      <Main>
        <MainTitle>전국 곳곳의 감성 숙소 모음</MainTitle>
        <Interval height="1px" />
        <MainDate>2022.01.17 - 2022.02.09</MainDate>
        <Interval height="16px" />
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          ratione veniam commodi dolorum accusamus esse cumque qui voluptatem,
          delectus neque id harum hic voluptas, quisquam tenetur eligendi ea
          voluptate aliquid.
        </Typography>
      </Main>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  flex: 1;
`;

const PageItem = styled.View`
  width: ${windowWidth + "px"};
  height: ${windowWidth * 0.92 + "px"};
`;

const ImageItem = styled.Image``;

const NavSection = styled.View`
  position: absolute;
  top: ${SafeAreaHeightForIos + "px"};
  left: 0;
  z-index: 1;
`;

const Header = styled.View`
  position: relative;
`;

const InnerWrapper = styled.View`
  flex-direction: row;
  margin-left: 24px;
  margin-top: 14px;
`;

const SearchBox = styled(FlexBox)`
  justify-content: flex-start;
  margin-right: 16px;
`;

const NotiBox = styled(FlexBox)`
  margin-right: 24px;
`;

const TypoSection = styled.View`
  position: absolute;
  left: 24px;
  bottom: 32px;
  z-index: 1;
`;

const HeaderTitle = styled(Typography).attrs({
  variant: "headline-bold",
})`
  color: ${({ theme }) => theme.colors.background.paper};
`;

const Tag = styled(Typography).attrs({
  variant: "body-regular",
})`
  color: ${({ theme }) => theme.colors.primary.main};
`;

const TitleSection = styled.View``;
const TagSection = styled(FlexBox)``;

const Main = styled(View)`
  background-color: ${({ theme }) => theme.colors.background.default};
  padding: 32px 24px 0 24px;
  flex: 1;
`;

const MainTitle = styled(Typography).attrs({
  variant: "subhead-medium",
})``;

const MainDate = styled(Typography).attrs({
  textSize: "10px",
})`
  color: ${({ theme }) => theme.colors.grey[99]};
`;
