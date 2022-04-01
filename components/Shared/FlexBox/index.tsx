import React, { FC } from "react";
import styled from "styled-components/native";
import { View, ViewComponent } from "react-native";

type Props = {} & Partial<typeof ViewComponent>;

const Component: FC<Props> = ({ children, ...rest }) => {
  return <FlexBox {...rest}>{children}</FlexBox>;
};

export default Component;

const FlexBox = styled.View`
  display: flex;
  flex-direction: row;
`;
