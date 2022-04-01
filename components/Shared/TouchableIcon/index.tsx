import React, { FC } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable";

type Props = {} & GenericTouchableProps

const Component: FC<Props> = ({ onPress, children }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default Component;
