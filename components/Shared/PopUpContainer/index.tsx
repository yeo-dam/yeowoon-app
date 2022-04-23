import React, { PropsWithChildren, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

type Props = {
  modalVisible: boolean;
  content: JSX.Element;
  openModal: () => void;
  closeModal: () => void;
};

const Component: React.FC<PropsWithChildren<Props>> = ({
  content,
  children,
  openModal,
  closeModal,
  modalVisible,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    closeModal();
  };
  const handleOpen = () => {
    setIsOpen(true);
    openModal();
  };
  return (
    <Wrapper>
      <ModalContainer onPress={handleClose}>
        <DropDownBox>{isOpen && content}</DropDownBox>
      </ModalContainer>
      <PressableBox onPress={handleOpen}>{children}</PressableBox>
    </Wrapper>
  );
};

const Wrapper = styled.View``;

const ModalContainer = styled.Pressable`
  position: absolute;
  z-index: 100;
  flex: 1;
  height: 100%;
`;
const PressableBox = styled.Pressable`
  width: 100%;
  border: 1px solid green;
`;

const DropDownBox = styled.View`
  position: absolute;
  z-index: 1000;
  top: 100px;
  right: 0px;
  background-color: white;
  padding: 32px 24px 0 24px;
  align-items: flex-start;
`;

export default Component;
