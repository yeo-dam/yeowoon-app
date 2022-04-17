import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import React, { FC, useContext } from "react";
import { View, StyleSheet, Platform, Keyboard, Pressable } from "react-native";
import styled from "styled-components/native";

type Props = {
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
  alignItems?: "flex-start" | "flex-end" | "center" | "space-between";
};

const KeyboardAvoding: FC<Props> = ({
  alignItems = "center",
  justifyContent = "center",
  children,
}) => {
  const bottomBarHeight = useContext(BottomTabBarHeightContext);

  return (
    <Wrapper
      alignItems={alignItems}
      justifyContent={justifyContent}
      keyboardVerticalOffset={bottomBarHeight}
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
  flex: 1;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`;

const InnerWrapper = styled.View`
  flex: 1;
`;

export default KeyboardAvoding;
