import * as React from "react";
import { useEffect, useState } from "react";

import ErrorMsg from "~components/Shared/ErrorMsg";
import Loadable from "~components/Shared/Loadable";
import MyPageViewModel from "./MyPage.vm";
import { observer } from "mobx-react";
import Typography from "~components/Shared/Typography";
import { Pressable, View } from "react-native";
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

type Tabs = "게시글" | "저장글" | "팔로워" | "팔로잉";
const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MYPAGE_SCREEN_NAME.MAIN>) => {
  const vm = getRootViewModel<MyPageViewModel>(
    (viewModel) => viewModel.tab.MyPage
  );

  const [currentTab, setTab] = useState<Tabs>("게시글");

  useEffect(() => {
    async function loadPosts() {
      await vm.load();
    }
    loadPosts();
  }, []);

  // if (vm.isLoading) {
  //   return <Loadable />;
  // }

  // if (vm.isError) {
  //   return <ErrorMsg />;
  // }

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
          name=""
          width={58}
          height={58}
          imageSource={"https://picsum.photos/58/58"}
        />
        <ProfileTextBox>
          <Typography variant="subhead-medium">userName</Typography>
          <GreyTypo numberOfLines={2} ellipsizeMode="tail">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
            dolorum iste praesentium aspernatur reprehenderit quas quis deleniti
            nemo, qui eligendi! Officia sapiente praesentium ut adipisci
            ducimus. Optio fugit et iusto!
          </GreyTypo>
        </ProfileTextBox>
      </ProfileSection>
      <ContentHeader>
        <Pressable onPress={() => setTab("게시글")}>
          <HeaderItem>
            <CountItem isClicked={currentTab === "게시글"}>12</CountItem>
            <CountText isClicked={currentTab === "게시글"}>게시글</CountText>
          </HeaderItem>
        </Pressable>
        <DividerBox>
          <Divider orientation="Vertical" />
          {/* <Divider orientation="Vertical" height={"15px"} /> */}
        </DividerBox>
        <Pressable onPress={() => setTab("저장글")}>
          <HeaderItem>
            <CountItem isClicked={currentTab === "저장글"}>42</CountItem>
            <CountText isClicked={currentTab === "저장글"}>저장글</CountText>
          </HeaderItem>
        </Pressable>
        <DividerBox>
          <Divider orientation="Vertical" />
          {/* <Divider orientation="Vertical" height={"15px"} /> */}
        </DividerBox>
        <Pressable onPress={() => setTab("팔로워")}>
          <HeaderItem>
            <CountItem isClicked={currentTab === "팔로워"}>27</CountItem>
            <CountText isClicked={currentTab === "팔로워"}>팔로워</CountText>
          </HeaderItem>
        </Pressable>
        <DividerBox>
          <Divider orientation="Vertical" />
          {/* <Divider orientation="Vertical" height={"15px"} /> */}
        </DividerBox>
        <Pressable onPress={() => setTab("팔로잉")}>
          <HeaderItem>
            <CountItem isClicked={currentTab === "팔로잉"}>27</CountItem>
            <CountText isClicked={currentTab === "팔로잉"}>팔로잉</CountText>
          </HeaderItem>
        </Pressable>
      </ContentHeader>
      <ContentSection>
        <Divider />
        <ContentBody>
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
