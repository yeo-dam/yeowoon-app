import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import FlexBox from "components/Shared/FlexBox";
import Typography from "../Typography";
import ShareLogo from "~assets/Icons/Popup/Share.svg";
import ReportLogo from "~assets/Icons/Popup/Report.svg";
import DownloadLogo from "~assets/Icons/Popup/Download.svg";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <View>
      <FlexBox>
        <ShareLogo />
        <Typography>공유</Typography>
      </FlexBox>
      <FlexBox>
        <DownloadLogo />
        <Typography>이미지 저장</Typography>
      </FlexBox>
      <FlexBox>
        <ReportLogo />
        <Typography>신고</Typography>
      </FlexBox>
    </View>
  );
};

export default Component;
