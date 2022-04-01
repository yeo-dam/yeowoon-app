import React, { FC } from "react";
import styled from "styled-components/native";
import TouchableIcon from "components/Shared/TouchableIcon";
import FlexBox from "../FlexBox";
import SearchLogo from "~assets/Icons/Search.svg";
import NotificationLogo from "~assets/Icons/Notification.svg";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        <SearchBox>
          <TouchableIcon onPress={() => console.log("Touched")}>
            <SearchLogo />
          </TouchableIcon>
        </SearchBox>
        <NotiBox>
          <TouchableIcon onPress={() => console.log("Touched")}>
            <NotificationLogo />
          </TouchableIcon>
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
