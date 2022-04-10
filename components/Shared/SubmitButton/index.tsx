import React, { FC } from "react";
import styled from "styled-components/native";
import Button, { Props as ButtonProps } from "../Button";
import { useFormContext, FieldValues } from "react-hook-form";

type Props = {
  onSubmit: (data: any) => void;
} & ButtonProps;

const Component = ({ label, onSubmit, width, ...rest }: Props) => {
  const { handleSubmit } = useFormContext();
  console.log(`TCL ~ [index.tsx] ~ line ~ 12 ~ width`, width);
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

const StyledButton = styled(Button)<{ width?: string }>`
  width: ${({ width }) => (width ? width : "100%")};
  flex: 1;
  background-color: grey;
  border: 1px solid red;
`;
