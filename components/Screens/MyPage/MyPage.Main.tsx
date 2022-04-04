import * as React from "react";
import { useEffect } from "react";

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
    <Wrapper>
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
      <ContentSection>
        <ContentHeader>
          <HeaderItem>
            <CountItem>12</CountItem>
            <Typography>게시글</Typography>
          </HeaderItem>
          <Divider orientation="Vertical" />
          <HeaderItem>
            <CountItem>42</CountItem>
            <Typography>저장글</Typography>
          </HeaderItem>
          <Divider orientation="Vertical" />
          <HeaderItem>
            <CountItem>27</CountItem>
            <Typography>팔로워</Typography>
          </HeaderItem>
          <Divider orientation="Vertical" />
          <HeaderItem>
            <CountItem>27</CountItem>
            <Typography>팔로잉</Typography>
          </HeaderItem>
        </ContentHeader>
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
    </Wrapper>
  );
};

export default observer(MyPageScreen);

const Wrapper = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
  padding: 24px;
`;

const IconSection = styled(FlexBox)`
  margin-top: 50px;
  width: 100%;
  border: 1px solid blue;
`;

const ProfileSection = styled(FlexBox)`
  border: 1px solid red;
`;

const GreyTypo = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[99]};
`;

const ContentSection = styled.View`
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

const HeaderItem = styled.View``;

const CountItem = styled.Text``;
