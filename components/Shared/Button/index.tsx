import React, { FC } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";
import Typography from "~components/Shared/Typography";

export type Props = {
  label: string;
  width?: string;
  height?: string;
  color?: string;
  onPress?: (data?: any) => void;
} & TouchableOpacityProps;

const Component: FC<Props> = ({
  label,
  onPress,
  color,
  width,
  height,
  ...rest
}) => {
  return (
    <StyledButton
      label=""
      width={width}
      height={height}
      onPress={onPress}
      color={color}
      {...rest}
    >
      <StyledText>{label}</StyledText>
    </StyledButton>
  );
};

export default Component;

const StyledButton = styled(TouchableOpacity)<Props>`
  width: ${({ width }) => (width ? width : "100%")};
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
