import * as React from "react";
import { Text, TextProps } from "react-native";
import styled from "styled-components/native";
import { variantStyles } from "./style";
import { Variant } from "./types";

type type = "English" | "Korean" | "Number" | "Digital";
type Props = React.PropsWithChildren<
  {
    variant?: Variant;
    type?: type;
  } & TextProps
>;

const Component = ({
  children,
  type = "Korean",
  variant = "body-regular",
  ...rest
}: Props) => {
  return (
    <Typography type={type} variant={variant} {...rest}>
      {children}
    </Typography>
  );
};

const Typography = styled(Text)<{
  variant: Variant;
  type?: type;
  textSize?: string;
}>`
  font-family: ${({ type }) =>
    type === "Korean"
      ? "Spoqa-Han-Sans-Neo"
      : type === "Number"
      ? "Digit-Numbers"
      : "Montserrat"};
  ${({ variant }) => variantStyles[variant]};
`;

export default Component;
