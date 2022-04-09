import React, { FC } from "react";
import styled from "styled-components/native";
import FlexBox from "../FlexBox";
import SearchLogo from "~assets/Icons/Search.svg";
import NotificationLogo from "~assets/Icons/Notification.svg";
import { Pressable } from "react-native";
import { RootTabScreenProps } from "types";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";

type Props = Omit<RootTabScreenProps<typeof MAIN_SCREEN_NAME.HOME>, "route">;

const Component: FC<Props> = ({ navigation }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <SearchBox>
          <Pressable onPress={() => navigation.navigate("Search")}>
            <SearchLogo />
          </Pressable>
        </SearchBox>
        <NotiBox>
          <Pressable onPress={() => navigation.navigate("SettingNotification")}>
            <NotificationLogo />
          </Pressable>
        </NotiBox>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled(FlexBox)``;

const InnerWrapper = styled.View`
  flex-direction: row;
  margin-top: 14px;
`;

const SearchBox = styled(FlexBox)`
  justify-content: space-between;
  margin-right: 16px;
`;

const NotiBox = styled(FlexBox)`
  margin-right: 24px;
`;
