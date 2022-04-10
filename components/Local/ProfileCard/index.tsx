import React, { FC } from "react";
import styled from "styled-components/native";
import { Image, Pressable, View } from "react-native";
import Loadable from "~components/Shared/Loadable";
import PostListModel from "~domain/model/Local/PostListModel";
import Layout from "constants/Layout";
import FlexBox from "~components/Shared/FlexBox";

type Props = {
  item: PostListModel;
  isLoading: boolean;
  navigation: any;
};

const {
  window: { width: windowWidth, height: windowHeight },
} = Layout;

const Component: FC<Props> = ({ item, isLoading }) => {
  const renderCard = () => {
    if (isLoading) {
      return <Loadable />;
    } else {
      return (
        <Pressable onPress={() => console.log("")}>
          <MainImage source={{ uri: item.imageLocations[0] }} />
        </Pressable>
      );
    }
  };

  return <Wrapper>{renderCard()}</Wrapper>;
};

export default Component;

const Wrapper = styled.View``;

const MainImage = styled(Image)`
  width: ${windowWidth * 0.428 + "px"};
  height: ${windowHeight * 0.264 + "px"};
`;
