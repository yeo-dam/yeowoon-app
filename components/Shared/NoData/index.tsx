import React, { FC } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <Wrapper>
      <Text>데이터가 없습니다.</Text>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;
