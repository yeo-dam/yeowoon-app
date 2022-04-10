import React, { FC } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

type Props = {
  title?: string;
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
  alignItems?: "flex-start" | "flex-end" | "center" | "space-between";
};

const ContentLayout: FC<Props> = ({
  title,
  alignItems = "center",
  justifyContent = "center",
  children,
  ...rest
}) => {
  return (
    <Wrapper alignItems={alignItems} justifyContent={justifyContent} {...rest}>
      <View>{children}</View>
    </Wrapper>
  );
};

export default ContentLayout;

const Wrapper = styled.View<Props>`
  flex: 1;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`;
