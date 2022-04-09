import React, { FC } from "react";
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
  return (
    <Wrapper
      alignItems={alignItems}
      justifyContent={justifyContent}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <View style={styles.inner}>{children}</View>
      </Pressable>
    </Wrapper>
  );
};

const Wrapper = styled.KeyboardAvoidingView<Props>`
  flex: 1;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
`;

const styles = StyleSheet.create({
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
});

export default KeyboardAvoding;
