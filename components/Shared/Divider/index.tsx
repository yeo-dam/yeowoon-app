import React, { FC } from "react";
import styled, { css } from "styled-components/native";

type Props = {
  orientation?: "Horizontal" | "Vertical";
  border?: string;
  height?: string;
  color?: string;
};

const Component: FC<Props> = ({
  orientation = "Horizontal",
  color,
  border,
  height = "1px",
}) => {
  return (
    <Divider
      orientation={orientation}
      color={color}
      border={border}
      height={height}
    ></Divider>
  );
};

export default Component;

const Divider = styled.View<Props>`
  ${({ orientation }) =>
    orientation === "Horizontal"
      ? css`
          height: 1px;
        `
      : css`
          width: 1px;
        `}
  height: ${({ height }) => height};  background: ${({ color }) => (color ? color : "#999")};
`;
