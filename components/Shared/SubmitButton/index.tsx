import React, { FC } from "react";
import styled from "styled-components/native";
import Button, { Props as ButtonProps } from "../Button";
import { useFormContext, FieldValues } from "react-hook-form";

type Props = {
  onSubmit: (data: any) => void;
} & ButtonProps;

const Component = ({ label, onSubmit, width, ...rest }: Props) => {
  const { handleSubmit } = useFormContext();
  return (
    <StyledButton
      width={width}
      label={label}
      onPress={handleSubmit(onSubmit)}
      {...rest}
    />
  );
};

export default Component;

const StyledButton = styled(Button)<{ width?: string; color?: string }>`
  width: ${({ width }) => (width ? width : "100%")};
  background-color: ${({ color }) => (color ? color : "grey")};
  flex: 1;
`;
