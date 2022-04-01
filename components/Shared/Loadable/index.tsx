import React, { FC } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <ActivityIndicator />
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;
