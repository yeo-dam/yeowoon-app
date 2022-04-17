import { renderErrMsg } from "helper/Formatter/ErrorMessage";
import React, { FC } from "react";
import { Controller, get, useFormContext } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native";
import styled, { css } from "styled-components/native";
import Typography from "../Typography";

export type Props = {
  name: string;
  hidden?: boolean;
  errMsg?: string;
  fontSize?: string;
  placeholderTextColor?: string;
  color?: string;
  disabled?: boolean;
  width?: string;
  height?: string;
  FullWidth?: boolean;
} & TextInputProps;

const Component: FC<Props> = ({
  name,
  errMsg,
  hidden = false,
  placeholder,
  width,
  height,
  fontSize,
  color,
  disabled = false,
  FullWidth,
  placeholderTextColor,
  ...rest
}) => {
  const { control, formState } = useFormContext();
  const error = get(formState.errors, name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <InputWrapper hidden={hidden} FullWidth={FullWidth}>
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
            width={width}
            height={height}
            {...rest}
          />
          {error && <ErrMsg>{renderErrMsg(error, errMsg)}</ErrMsg>}
        </InputWrapper>
      )}
    />
  );
};

export default Component;

const InputWrapper = styled.View<{
  hidden: boolean;
  FullWidth?: boolean;
}>`
  display: ${({ hidden }) => (hidden ? "none" : "flex")};
  align-items: flex-start;
  justify-content: flex-start;
  ${({ FullWidth }) =>
    FullWidth &&
    css`
      width: 90%;
    `}
`;

const StyledTextInput = styled(TextInput)<Props>`
  color: ${({ color }) => (color ? color : "black")};
  width: ${({ width }) => (width ? width : "100%")};
  height: ${({ height }) => (height ? height : "100%")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "14px")};
  /* border: 1px solid green; */
`;

const ErrMsg = styled(Typography)`
  color: red;
`;
