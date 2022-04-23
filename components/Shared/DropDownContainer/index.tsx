import React, { PropsWithChildren, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

type Props = {
  animationType: "none" | "slide" | "fade" | undefined;
  content: JSX.Element;
  modalVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const Component: React.FC<PropsWithChildren<Props>> = ({
  content,
  children,
  modalVisible,
  openModal,
  closeModal,
  animationType = "slide",
}) => {
  return (
    <Wrapper>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          closeModal();
        }}
      >
        <ModalContainer onPress={closeModal}>
          <DropDownBox>
            {content}
            <BottomSafeAreaView />
          </DropDownBox>
        </ModalContainer>
      </Modal>
      <PressableBox onPress={openModal}>{children}</PressableBox>
    </Wrapper>
  );
};

const Wrapper = styled.View``;

const BottomSafeAreaView = styled(SafeAreaView)`
  width: 100%;
  background-color: white;
  padding-top: 24px;
`;

const ModalContainer = styled.Pressable`
  flex: 1;
  height: 100%;
  border: 1px solid blue;
`;
const PressableBox = styled.Pressable`
  width: 100%;
`;

const DropDownBox = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 32px 24px 0 24px;
  align-items: flex-start;
`;

export default Component;
