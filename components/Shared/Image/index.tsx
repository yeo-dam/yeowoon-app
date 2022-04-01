import React from "react";
import { Image, ImageProps, ImageSourcePropType } from "react-native";
import styled from "styled-components/native";

export type Props = {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  hasBorderRadius?: boolean;
  round?: boolean;
} & ImageProps;

// TODO : Carousel 처럼 aspectRatio 추가 할 것

const StyledImg = styled(Image)<{
  width?: number;
  height?: number;
  hasBorderRadius?: boolean;
  round?: boolean;
}>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "auto")};
  ${({ hasBorderRadius, round, width }) =>
    hasBorderRadius &&
    `
     border-radius: ${round && width ? `${width / 2}px` : "4px"};
   `};
`;

const Component = ({
  width,
  height,
  source,
  round = false,
  hasBorderRadius = true,
  ...rest
}: Props) => {
  return (
    <StyledImg
      width={width}
      height={height}
      source={source}
      hasBorderRadius={hasBorderRadius}
      round={round}
      {...rest}
    />
  );
};

export default Component;
