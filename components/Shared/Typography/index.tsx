import * as React from "react";
import { Text, TextProps } from "react-native";
import styled, { css } from "styled-components/native";
import { variantStyles } from "./style";
import { Variant } from "./types";

type type = "English" | "Korean" | "Number" | "Digital";
type Props = React.PropsWithChildren<
  {
    variant?: Variant;
    type?: type;
    textSize?: string;
  } & TextProps
>;

const Component = ({
  children,
  type = "Korean",
  variant = "body-regular",
  textSize = "10px",
  ...rest
}: Props) => {
  return (
    <Typography type={type} variant={variant} textSize={textSize} {...rest}>
      {children}
    </Typography>
  );
};

const Typography = styled(Text)<{
  variant: Variant;
  type?: type;
  textSize?: string;
}>`
  font-size: ${({ textSize, variant }) => !variant && textSize};
  font-family: ${({ type }) =>
    type === "Korean"
      ? "Spoqa-Han-Sans-Neo"
      : type === "Number"
      ? "Digit-Numbers"
      : "Montserrat"};
  ${({ variant }) => variantStyles[variant]};
`;

export default Component;
