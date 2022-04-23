import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import React, { FC, useContext } from "react";
import { Platform, Keyboard, Pressable } from "react-native";
import styled from "styled-components/native";

type Props = {
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
  alignItems?: "flex-start" | "flex-end" | "center" | "space-between";
  padding?: string;
  addictionalBarHeight?: number;
};

const KeyboardAvoding: FC<Props> = ({
  alignItems = "center",
  justifyContent = "center",
  addictionalBarHeight,
  padding,
  children,
}) => {
  const bottomBarHeight = useContext(BottomTabBarHeightContext);

  return (
    <Wrapper
      padding={padding}
      alignItems={alignItems}
      justifyContent={justifyContent}
      keyboardVerticalOffset={
        bottomBarHeight && addictionalBarHeight
          ? bottomBarHeight + addictionalBarHeight
          : bottomBarHeight
      }
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
    >
      <Pressable onPress={Keyboard.dismiss}>
        <InnerWrapper>{children}</InnerWrapper>
      </Pressable>
    </Wrapper>
  );
};

const Wrapper = styled.KeyboardAvoidingView<Props>`
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex: 1;
`;

const InnerWrapper = styled.View`
  flex: 1;
`;

export default KeyboardAvoding;
