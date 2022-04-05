import * as React from "react";
import { useEffect, useState } from "react";

import ContentLayout from "~components/Layout/ContentLayout";
import ErrorMsg from "~components/Shared/ErrorMsg";
import Loadable from "~components/Shared/Loadable";
import MyPageViewModel from "./MyPage.vm";
import { observer } from "mobx-react";
import Typography from "~components/Shared/Typography";
import TouchableIcon from "~components/Shared/TouchableIcon";
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
import AuthViewModel from "../AuthViewModel";
import Image from "~components/Shared/Image";
import Divider from "~components/Shared/Divider";
import StatusBarLayout from "~components/Layout/StatusBarLayout";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MYPAGE_SCREEN_NAME.MAIN>) => {
  const vm = getRootViewModel<MyPageViewModel>(
    (viewModel) => viewModel.tab.MyPage
  );

  const [currentTab, setTab] = useState<
    "게시글" | "저장글" | "팔로워" | "팔로잉"
  >();

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
    <Layout paddingLeft={24} paddingRight={24}>
      <IconSection>
        <Pressable onPress={() => navigation.navigate("Map")}>
          <MapLogo />
        </Pressable>
        <Interval width="14px" />
        <SettingLogo />
      </IconSection>

      <ProfileSection>
        <Avatar name="" imageSource={"https://picsum.photos/58/58"} />
        <View>
          <Typography variant="subhead-medium">userName</Typography>
          <GreyTypo>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur debitis rem magni aliquid minus quae praesentium
            laboriosam? Natus adipisci accusantium excepturi voluptatibus,
            distinctio, ex consequuntur iure magni quibusdam praesentium
            architecto?
          </GreyTypo>
        </View>
      </ProfileSection>
      <ContentHeader>
        <Pressable onPress={() => setTab("게시글")}>
          <HeaderItem isClicked={true}>
            <CountItem>12</CountItem>
            <Typography>게시글</Typography>
          </HeaderItem>
        </Pressable>
        <Divider orientation="Vertical" height={"15px"} />
        <Pressable onPress={() => setTab("저장글")}>
          <HeaderItem isClicked={false}>
            <CountItem>42</CountItem>
            <Typography>저장글</Typography>
          </HeaderItem>
        </Pressable>
        <Divider orientation="Vertical" height={"15px"} />
        <Pressable onPress={() => setTab("팔로워")}>
          <HeaderItem isClicked={false}>
            <CountItem>27</CountItem>
            <Typography>팔로워</Typography>
          </HeaderItem>
        </Pressable>
        <Divider orientation="Vertical" height={"15px"} />
        <Pressable onPress={() => setTab("팔로잉")}>
          <HeaderItem isClicked={false}>
            <CountItem>27</CountItem>
            <Typography>팔로잉</Typography>
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
  border: 1px solid blue;
  height: 48px;
  flex: 1;
`;

const ProfileSection = styled(FlexBox)`
  border: 1px solid red;
`;

const GreyTypo = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[99]};
`;

const ContentSection = styled.ScrollView`
  border: 1px solid green;
`;

const ContentHeader = styled(FlexBox)`
  width: 100%;
  justify-content: space-around;
`;

const ContentBody = styled(FlexBox)`
  margin-top: 24px;
  flex-wrap: wrap;
`;

const HeaderItem = styled(View)<{ isClicked?: boolean }>`
  align-items: center;
  color: ${({ isClicked, theme }) =>
    isClicked ? theme.colors.grey.black : theme.colors.grey.AA};
`;

const CountItem = styled.Text``;
