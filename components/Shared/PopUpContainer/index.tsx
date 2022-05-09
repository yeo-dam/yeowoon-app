import React, { PropsWithChildren, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import FlexBox from "../FlexBox";
import Interval from "../Interval";
import Typography from "../Typography";
import { useHeaderHeight } from "@react-navigation/elements";

type Props = {
  order: number;
  multiLine: number[];
  commentId: string;
  modalVisible: boolean;
  onCommentDelete: (id: string) => void;
  openModal: () => void;
  closeModal: () => void;
};

const Component: React.FC<PropsWithChildren<Props>> = ({
  order,
  multiLine,
  commentId,
  children,
  openModal,
  closeModal,
  modalVisible,
  onCommentDelete,
}) => {
  const headerHeight = useHeaderHeight();
  const firstHeaderHeight = headerHeight + 16 + 18 + 8;
  const multiLineCount = multiLine
    .slice(0, order)
    .reduce((prev, cur) => prev + cur, 0);

  const commentHeight = order * 101.3 + multiLineCount * 18;

  const handleClose = () => {
    closeModal();
  };
  const handleOpen = () => {
    openModal();
  };
  return (
    <Wrapper>
      <Modal
        animationType={"none"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          closeModal();
        }}
      >
        <ModalContainer onPress={handleClose}>
          <DropDownBox
            order={order}
            headerHeight={firstHeaderHeight}
            commentHeight={commentHeight}
          >
            <ButtonBox>
              <Pressable
                onPress={() => {
                  onCommentDelete(commentId);
                  closeModal();
                }}
              >
                <DropDownTypo>삭제</DropDownTypo>
              </Pressable>
            </ButtonBox>
            <Interval height="12px" />
            <ButtonBox>
              <Pressable onPress={() => console.log("신고")}>
                <DropDownTypo>신고</DropDownTypo>
              </Pressable>
            </ButtonBox>
          </DropDownBox>
        </ModalContainer>
      </Modal>
      <PressableBox onPress={handleOpen}>{children}</PressableBox>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View``;

const ModalContainer = styled.Pressable`
  flex: 1;
  height: 100%;
`;

const PressableBox = styled.Pressable`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DropDownBox = styled.View<{
  order: number;
  headerHeight: number;
  commentHeight: number;
}>`
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  top: ${({ order, headerHeight, commentHeight }) =>
    order === 0 ? headerHeight + "px" : headerHeight + commentHeight + "px"};
  right: 24px;
  width: 66px;
  height: 65px;
  opacity: 1;
  background-color: white;
  align-items: flex-start;
`;

const ButtonBox = styled(FlexBox)`
  width: 100%;
  justify-content: center;
`;

const DropDownTypo = styled(Typography).attrs({ variant: "subhead-regular" })``;
