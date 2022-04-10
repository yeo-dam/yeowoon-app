import * as React from "react";
import { useEffect, useState } from "react";

import MyPageViewModel from "./MyPage.vm";
import { observer } from "mobx-react";
import Typography from "~components/Shared/Typography";
import { FlatList, Pressable, View } from "react-native";
import { MYPAGE_SCREEN_NAME } from "constants/SCREEN_NAME";
import { RootTabScreenProps } from "types";
import { getRootViewModel } from "../VmManager";
import MapLogo from "~assets/Icons/Subtract.svg";
import SettingLogo from "~assets/Icons/Setting.svg";
import styled from "styled-components/native";
import FlexBox from "~components/Shared/FlexBox";
import Interval from "~components/Shared/Interval";
import Avatar from "~components/Shared/Avatar";
import Image from "~components/Shared/Image";
import Divider from "~components/Shared/Divider";
import StatusBarLayout from "~components/Layout/StatusBarLayout";
import theme from "themes";
import PostListModel from "~domain/model/Local/PostListModel";
import NoData from "~components/Shared/NoData";
import ProfileCard from "~components/Local/ProfileCard";

type Tabs = "게시글" | "저장글" | "팔로워" | "팔로잉";
const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MYPAGE_SCREEN_NAME.MAIN>) => {
  const vm = getRootViewModel<MyPageViewModel>(
    (viewModel) => viewModel.tab.MyPage
  );
  const { id: userId } = getRootViewModel((vm) => vm.auth.user);

  const userDetail = vm.userDetail;

  const [currentTab, setTab] = useState<Tabs>("게시글");

  useEffect(() => {
    async function load() {
      await vm.loadProfile(userId);
      await vm.loadPosts(userId, 0);
    }
    load();
  }, []);

  const renderCard = (item: PostListModel) => {
    if (vm.posts && vm.posts.length === 0) {
      return <NoData />;
    } else {
      return (
        <ProfileCard
          isLoading={vm.isLoading}
          item={item}
          navigation={navigation}
        />
      );
    }
  };

  return (
    <Layout paddingLeft={24} paddingRight={24}>
      <IconSection>
        <Pressable onPress={() => navigation.navigate("Map")}>
          <MapLogo />
        </Pressable>
        <Interval width="14px" />
        <SettingLogoBox>
          <SettingLogo />
        </SettingLogoBox>
      </IconSection>

      <ProfileSection>
        <Avatar
          width={58}
          height={58}
          imageSource={userDetail?.user.userImage?.url}
        />
        <ProfileTextBox>
          <Typography variant="subhead-medium">
            {userDetail?.user.userName}
          </Typography>
          <GreyTypo numberOfLines={2} ellipsizeMode="tail">
            {userDetail?.user.introduction || "등록된 소개가 없습니다."}
          </GreyTypo>
        </ProfileTextBox>
      </ProfileSection>
      <ContentHeader>
        <Pressable onPress={() => setTab("게시글")}>
          <HeaderItem>
            <CountItem isClicked={currentTab === "게시글"}>
              {userDetail?.postCount || 0}
            </CountItem>
            <CountText isClicked={currentTab === "게시글"}>게시글</CountText>
          </HeaderItem>
        </Pressable>
        <DividerBox>
          <Divider orientation="Vertical" />
          {/* <Divider orientation="Vertical" height={"15px"} /> */}
        </DividerBox>
        <Pressable onPress={() => setTab("저장글")}>
          <HeaderItem>
            <CountItem isClicked={currentTab === "저장글"}>
              {userDetail?.bookmarkCount || 0}
            </CountItem>
            <CountText isClicked={currentTab === "저장글"}>저장글</CountText>
          </HeaderItem>
        </Pressable>
        <DividerBox>
          <Divider orientation="Vertical" />
          {/* <Divider orientation="Vertical" height={"15px"} /> */}
        </DividerBox>
        <Pressable onPress={() => setTab("팔로워")}>
          <HeaderItem>
            <CountItem isClicked={currentTab === "팔로워"}>
              {userDetail?.followerCount || 0}
            </CountItem>
            <CountText isClicked={currentTab === "팔로워"}>팔로워</CountText>
          </HeaderItem>
        </Pressable>
        <DividerBox>
          <Divider orientation="Vertical" />
          {/* <Divider orientation="Vertical" height={"15px"} /> */}
        </DividerBox>
        <Pressable onPress={() => setTab("팔로잉")}>
          <HeaderItem>
            <CountItem isClicked={currentTab === "팔로잉"}>
              {userDetail?.followingCount || 0}
            </CountItem>
            <CountText isClicked={currentTab === "팔로잉"}>팔로잉</CountText>
          </HeaderItem>
        </Pressable>
      </ContentHeader>
      <ContentSection>
        <Divider />
        <ContentBody>
          <FlatList<PostListModel>
            numColumns={2}
            data={vm.posts}
            renderItem={({ item }) => renderCard(item)}
          />
          {/* <Image
            width={161}
            height={212}
            source={{ uri: "https://picsum.photos/161/212" }}
          /> */}
          {/* <Image
            width={161}
            height={212}
            source={{ uri: "https://picsum.photos/161/212" }}
          />
          <Image
            width={161}
            height={212}
            source={{ uri: "https://picsum.photos/161/212" }}
          />
          <Image
            width={161}
            height={212}
            source={{ uri: "https://picsum.photos/161/212" }}
          />
          <Image
            width={161}
            height={212}
            source={{ uri: "https://picsum.photos/161/212" }}
          />
          <Image
            width={161}
            height={212}
            source={{ uri: "https://picsum.photos/161/212" }}
          /> */}
        </ContentBody>
      </ContentSection>
    </Layout>
  );
};

export default observer(MyPageScreen);

const Layout = styled(StatusBarLayout).attrs({
  alignItems: "flex-start",
  justifyContent: "flex-start",
})`
  flex: 1;
`;

const IconSection = styled(FlexBox)`
  align-items: center;
  justify-content: flex-end;
  margin-right: 12px;
  height: 48px;
`;

const ProfileTextBox = styled.View`
  overflow: hidden;
`;

const ProfileSection = styled(FlexBox)`
  padding-right: 24px;
`;

const GreyTypo = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[99]};
  width: 223px;
  /* padding-right: 72px; */
`;

const ContentSection = styled.ScrollView``;

const ContentHeader = styled(FlexBox)`
  justify-content: space-around;
  align-items: flex-end;
  padding-bottom: 8px;
  width: 100%;
`;

const ContentBody = styled(FlexBox)`
  margin-top: 24px;
  flex-wrap: wrap;
`;

const DividerBox = styled(FlexBox)`
  justify-content: flex-end;
  height: 15px;
`;

const SettingLogoBox = styled.View`
  padding-top: 7px;
`;

const HeaderItem = styled(View)`
  margin-top: 28px;
  align-items: center;
`;

const CountItem = styled.Text<{ isClicked?: boolean }>`
  color: ${({ isClicked }) =>
    isClicked ? theme.colors.grey.black : theme.colors.grey.AA};
`;

const CountText = styled.Text<{ isClicked?: boolean }>`
  color: ${({ isClicked }) =>
    isClicked ? theme.colors.grey.black : theme.colors.grey.AA};
`;
