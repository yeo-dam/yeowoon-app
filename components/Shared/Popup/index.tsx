import React, { FC } from "react";
import styled from "styled-components/native";
import { Pressable, View, Share } from "react-native";
import FlexBox from "~components/Shared/FlexBox";
import Typography from "../Typography";
import ShareLogo from "~assets/Icons/Popup/Share.svg";
import ReportLogo from "~assets/Icons/Popup/Report.svg";
import DownloadLogo from "~assets/Icons/Popup/Download.svg";
import Interval from "~components/Shared/Interval";

type Props = {};

const Component: FC<Props> = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: unknown) {
      if (typeof error === "string") {
        throw error.toUpperCase(); // works, `error` narrowed to string
      } else if (error instanceof Error) {
        throw error.message; // works, `error` narrowed to Error
      }
    }
  };

  return (
    <View>
      <Pressable onPress={onShare}>
        <FlexBox>
          <ShareLogo />
          <Interval width="24px" />
          <DropDownTypo>공유</DropDownTypo>
        </FlexBox>
      </Pressable>
      <Interval height="24px" />
      <Pressable onPress={() => console.log("이미지 저장")}>
        <FlexBox>
          <DownloadLogo />
          <Interval width="24px" />
          <DropDownTypo>이미지 저장</DropDownTypo>
        </FlexBox>
      </Pressable>
      <Interval height="24px" />
      <Pressable onPress={() => console.log("신고")}>
        <FlexBox>
          <ReportLogo />
          <Interval width="24px" />
          <DropDownTypo>신고</DropDownTypo>
        </FlexBox>
      </Pressable>
    </View>
  );
};

export default Component;

const DropDownTypo = styled(Typography).attrs({ variant: "subhead-regular" })``;
