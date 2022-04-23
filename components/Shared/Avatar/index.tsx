import React, { FC } from "react";
import styled from "styled-components/native";
import { ImageSourcePropType, ImageURISource, View } from "react-native";
import Image from "~components/Shared/Image";
import Typography from "../Typography";

type Props = {
  width?: number;
  height?: number;
  name?: string;
  imageSource?: { url: string };
};

const Component: FC<Props> = ({
  name,
  imageSource,
  width = 24,
  height = 24,
}) => {
  return (
    <Wrapper>
      {imageSource ? (
        <StyledImage
          width={width}
          height={height}
          source={{ uri: imageSource.url }}
        />
      ) : (
        <StyledImage
          width={width}
          height={height}
          source={require("~assets/Icons/Login/NoProfile.png")}
        />
      )}
      <UserName>{name}</UserName>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledImage = styled(Image)<{ width?: number; height?: number }>`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  border-radius: ${({ width }) => `${width}px`};
  margin-right: 8px;
`;

const UserName = styled(Typography).attrs({ variant: "english-regular" })`
  color: ${({ theme }) => theme.colors.grey.black};
`;
