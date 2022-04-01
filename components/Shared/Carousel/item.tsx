import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

export type CarouselItem = {
  onPressHandler: (url: string) => void;
  aspectRatio: number;
  item: any;
};
const imageW = Dimensions.get("screen").width;

const Item = ({ onPressHandler, item, aspectRatio }: CarouselItem) => {
  return (
    <TouchableView onPress={() => onPressHandler(item.url)}>
      <PageItem>
        <ImageItem source={{ uri: item.url }} style={{ aspectRatio }} />
      </PageItem>
    </TouchableView>
  );
};

const TouchableView = styled.TouchableWithoutFeedback``;

const PageItem = styled.View`
  width: ${imageW + "px"};
  height: ${imageW * 0.92 + "px"};
`;

const ImageItem = styled.Image``;

export default Item;
