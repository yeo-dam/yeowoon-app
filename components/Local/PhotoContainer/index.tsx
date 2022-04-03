import React, { FC, useState } from "react";
import styled from "styled-components/native";
import FlexBox from "~components/Shared/FlexBox";
import Avatar from "~components/Shared/Avatar";
import DropDownMenu from "~components/Shared/DropDownMenu";
import DropDownContainer from "~components/Shared/DropDownContainer";
import Flex from "~components/Shared/FlexBox";
import Interval from "~components/Shared/Interval";
import Typography from "~components/Shared/Typography";
import WishlistLogo from "~assets/Icons/wishlist.svg";
import ShareLogo from "~assets/Icons/Popup/Share.svg";
import ReportLogo from "~assets/Icons/Popup/Report.svg";
import DownloadLogo from "~assets/Icons/Popup/Download.svg";
import { View } from "react-native";
import PostListModel from "~domain/model/Local/PostListModel";

type Props = {
  item: PostListModel;
};

const Component: FC<Props> = ({ item, children }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Wrapper>
      <PhotoHeader>
        <Avatar
          name={item.user.userName}
          imageSource={item.user.userImage?.url}
        />
        <IconSection>
          <IconBox>
            <WishlistLogo />
          </IconBox>
          <DropDownContainer
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            content={
              <View>
                <Flex>
                  <ShareLogo />
                  <Interval width="24px" />
                  <DropDownTypo>공유</DropDownTypo>
                </Flex>
                <Interval height="24px" />
                <Flex>
                  <DownloadLogo />
                  <Interval width="24px" />
                  <DropDownTypo>이미지 저장</DropDownTypo>
                </Flex>
                <Interval height="24px" />
                <Flex>
                  <ReportLogo />
                  <Interval width="24px" />
                  <DropDownTypo>신고</DropDownTypo>
                </Flex>
              </View>
            }
          >
            <DropDownMenu />
          </DropDownContainer>
        </IconSection>
      </PhotoHeader>
      {children}
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  background-color: #f1f1f1;
  padding: 32px 12px 32px 12px;
`;

const PhotoHeader = styled(FlexBox)`
  justify-content: space-between;
  margin-bottom: 12px;
`;

const IconSection = styled(FlexBox)``;

const IconBox = styled.View`
  margin-right: 14px;
`;

const DropDownBox = styled.View`
  margin-right: 12px;
`;

const DropDownTypo = styled(Typography).attrs({ variant: "subhead-regular" })``;
