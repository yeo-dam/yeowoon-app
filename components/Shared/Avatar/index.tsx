import React, { FC } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import Image from "components/Shared/Image";
import Typography from "../Typography";

type Props = {
  name?: string;
  imageSource?: string;
};

const Component: FC<Props> = ({ name, imageSource }) => {
  return (
    <Wrapper>
      <StyledImage source={{ uri: imageSource }} />
      <UserName>{name}</UserName>
    </Wrapper>
  );
};

export default Component;

const Wrapper = styled.View`
  flex-direction: row;
`;

const StyledImage = styled(Image)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 24px;
`;

const UserName = styled(Typography).attrs({ variant: "english-regular" })`
  color: ${({ theme }) => theme.colors.grey.black};
`;
