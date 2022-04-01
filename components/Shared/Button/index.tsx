import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import Typography from "components/Shared/Typography";

export type Props = {
  label: string;
  color?: string;
  onPress?: (data?: any) => void;
} & TouchableOpacityProps;

const Component: FC<Props> = ({ label, onPress, color, ...rest }) => {
  return (
    <StyledButton label="" onPress={onPress} color={color} {...rest}>
      <StyledText>{label}</StyledText>
    </StyledButton>
  );
};

export default Component;

const StyledButton = styled(TouchableOpacity)<Props>`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.primary.main};
`;

const StyledText = styled(Typography).attrs({
  variant: "button",
})`
  color: white;
`;
