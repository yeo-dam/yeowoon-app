import React, { FC } from "react";
import { Platform, View } from "react-native";
import styled from "styled-components/native";

type Props = {};

const Component: FC<Props> = ({ children }) => {
  return (
    <Wrapper behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View>{children}</View>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
