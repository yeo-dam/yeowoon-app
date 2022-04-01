import React, { FC } from "react";
import styled from "styled-components/native";
import Button, { Props as ButtonProps } from "../Button";
import { useFormContext, FieldValues } from "react-hook-form";

type Props = {
  onSubmit: (data: any) => void;
} & ButtonProps;

const Component = ({ label, onSubmit }: Props) => {
  const { handleSubmit } = useFormContext();
  return <StyledButton label={label} onPress={handleSubmit(onSubmit)} />;
};

export default Component;

const StyledButton = styled(Button)`
  width: 100%;
  flex: 1;
  background-color: grey;
`;
