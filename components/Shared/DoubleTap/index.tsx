import React, { FC } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";
import styled from "styled-components/native";

type Props = {
  delay: number;
  setIsFront: (data: boolean) => void;
  animatedValue: Animated.Value | Animated.ValueXY;
};

const Component: FC<Props> = ({
  delay = 1000,
  setIsFront,
  animatedValue,
  children,
}) => {
  const renderedTime = Date.now();
  const handleToggleLike = () => {
    Animated.sequence([
      Animated.spring(animatedValue, { toValue: 1, useNativeDriver: true }),
      Animated.spring(animatedValue, { toValue: 0, useNativeDriver: true }),
    ]).start();
  };

  let lastTapTime: any = null;

  const handleDoubleTap = () => {
    const tappedTime = Date.now();
    if (lastTapTime && tappedTime - lastTapTime < delay) {
      handleToggleLike();
    } else {
      lastTapTime = Date.now();
      if (tappedTime - renderedTime > delay) {
        setIsFront(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default Component;

const IconWrapper = styled.View``;

const HeartImage = styled.Image`
  width: 20,
  height: 20
`;
