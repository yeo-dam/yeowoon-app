import React, { FC } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <ErrorMsg>네트워크 에러 발생</ErrorMsg>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const ErrorMsg = styled.Text`
  color: red;
`;
