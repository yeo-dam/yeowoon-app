import { renderErrMsg } from "helper/Formatter/ErrorMessage";
import React, { FC } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";
import Typography from "../Typography";

export type Props = {
  name: string;
  hidden?: boolean;
  errMsg?: string;
  fontSize?: string;
  placeholderTextColor?: string;
  color?: string;
  disabled?: boolean;
} & TextInputProps;

const Component: FC<Props> = ({
  name,
  errMsg,
  hidden = false,
  placeholder,
  fontSize,
  color,
  disabled = false,
  placeholderTextColor,
  ...rest
}) => {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, name);

  return (
    <InputWrapper hidden={hidden}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <StyledTextInput
              name={name}
              onChangeText={(e) => {
                onChange(e);
              }}
              value={value}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              fontSize={fontSize}
              editable={!disabled}
              color={color}
              {...rest}
            />
            {error && <ErrMsg>{renderErrMsg(error, errMsg)}</ErrMsg>}
          </>
        )}
      />
    </InputWrapper>
  );
};

export default Component;

const InputWrapper = styled.View<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
`;

const StyledTextInput = styled(TextInput)<Props>`
  color: ${({ color }) => (color ? color : "black")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "14px")};
`;

const ErrMsg = styled(Typography)`
  color: red;
`;
