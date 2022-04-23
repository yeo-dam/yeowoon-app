import React, { FC, useContext, useState } from "react";
import styled from "styled-components/native";
import FlexBox from "~components/Shared/FlexBox";
import Avatar from "~components/Shared/Avatar";
import DropDownMenu from "~components/Shared/DropDownMenu";
import DropDownContainer from "~components/Shared/DropDownContainer";
import Typography from "~components/Shared/Typography";
import WishlistLogo from "~assets/Icons/wishlist.svg";
import WishlistClickedLogo from "~assets/Icons/wishlist_clicked.svg";
import PostListModel from "~domain/model/Local/PostListModel";

import Popup from "~components/Shared/Popup";
import { Pressable } from "react-native";
import { useModalContext } from "navigation/modalContext";

type Props = {
  item: PostListModel;
};

const Component: FC<Props> = ({ item, children }) => {
  const { isModalOpen, openModal, closeModal } = useModalContext();
  const [IsClicked, setIsClicked] = useState(false);

  return (
    <Wrapper>
      <PhotoHeader>
        <Avatar
          name={item?.user?.userName}
          imageSource={item?.user?.userImage}
        />
        <IconSection>
          <Pressable onPress={() => setIsClicked(!IsClicked)}>
            <IconBox>
              {IsClicked ? <WishlistClickedLogo /> : <WishlistLogo />}
            </IconBox>
          </Pressable>
          <DropDownContainer
            animationType="slide"
            modalVisible={isModalOpen}
            openModal={openModal}
            closeModal={closeModal}
            content={<Popup />}
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

const IconSection = styled(FlexBox)`
  align-items: center;
`;

const IconBox = styled.View`
  margin-right: 14px;
`;

const DropDownBox = styled.View`
  margin-right: 12px;
`;

const DropDownTypo = styled(Typography).attrs({ variant: "subhead-regular" })``;

const ProfileIconBox = styled.View`
  display: flex;
  width: 24px;
  height: 24px;
`;
