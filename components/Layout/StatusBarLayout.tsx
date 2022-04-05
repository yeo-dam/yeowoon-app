import React, { FC } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

type Props = {
  title?: string;
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
  alignItems?: "flex-start" | "flex-end" | "center" | "space-between";
  hasHeader?: boolean;
  paddingLeft?: number;
  paddingRight?: number;
};

const ContentLayout: FC<Props> = ({
  title,
  alignItems = "center",
  justifyContent = "center",
  children,
  paddingLeft = 0,
  paddingRight = 0,
  ...rest
}) => {
  return (
    <StyledSafeAreaView paddingLeft={paddingLeft} paddingRight={paddingRight}>
      <Wrapper
        alignItems={alignItems}
        justifyContent={justifyContent}
        {...rest}
      >
        <View>{children}</View>
      </Wrapper>
    </StyledSafeAreaView>
  );
};

export default ContentLayout;

const StyledSafeAreaView = styled(SafeAreaView)<{
  paddingLeft?: number;
  paddingRight?: number;
}>`
  flex: 1;
  padding-left: ${({ paddingLeft }) => `${paddingLeft}px`};
  padding-right: ${({ paddingRight }) => `${paddingRight}px`};
`;

const Wrapper = styled.View<Props>`
  flex: 1;
  border: 1px solid red;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`;
