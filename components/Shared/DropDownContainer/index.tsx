import React, { PropsWithChildren, useState } from "react";
import { Alert, Modal, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

type Props = {
  content: JSX.Element;
  modalVisible: boolean;
  setModalVisible: (data: boolean) => void;
};

const Component: React.FC<PropsWithChildren<Props>> = ({
  content,
  children,
  modalVisible,
  setModalVisible,
}) => {
  // if(modalVisible){
  //   return null;
  // }
  // FIXME : modal 바깥쪽 클릭했을 때, 모달창이 닫혀야 하는 문제
  return (
    <Wrapper>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        // setModalVisible(false);
        // }}
      >
        <ModalSafeAreaView />
        <ModalBackground />
        <DropDownBox>
          <PressableBox onPress={() => setModalVisible(false)}>
            {content}
          </PressableBox>
          <BottomSafeAreaView />
        </DropDownBox>
      </Modal>
      <PressableBox onPress={() => setModalVisible(true)}>
        {children}
      </PressableBox>
    </Wrapper>
  );
};

const Wrapper = styled.View``;

const ModalSafeAreaView = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.grey.black};
  opacity: 0.7;
`;

const BottomSafeAreaView = styled(SafeAreaView)`
  width: 100%;
  background-color: white;
`;

const ModalBackground = styled(View)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grey.black};
  opacity: 0.7;
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
  padding: 32px 24px 24px 24px;
  align-items: flex-start;
`;

export default Component;
