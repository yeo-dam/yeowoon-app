import { windowWidth } from "constants/Layout";
import React from "react";
import styled from "styled-components/native";

export type CarouselItem = {
  onPressHandler: (id: string, url: string) => void;
  aspectRatio: number;
  item: { id: string; url: string };
};

const Item = ({ onPressHandler, item, aspectRatio }: CarouselItem) => {
  return (
    <TouchableView onPress={() => onPressHandler(item.id, item.url)}>
      <PageItem>
        <ImageItem source={{ uri: item.url }} style={{ aspectRatio }} />
      </PageItem>
    </TouchableView>
  );
};

export default Item;

const TouchableView = styled.TouchableWithoutFeedback``;

const PageItem = styled.View`
  width: ${windowWidth + "px"};
  height: ${windowWidth * 0.92 + "px"};
`;

const ImageItem = styled.Image``;
