import React, { FC } from "react";
import styled from "styled-components/native";
import { Image, Pressable, View } from "react-native";
import Loadable from "~components/Shared/Loadable";
import PostListModel from "~domain/model/Local/PostListModel";
import { windowWidth } from "constants/Layout";
import FlexBox from "~components/Shared/FlexBox";
import { MAIN_SCREEN_NAME, MYPAGE_SCREEN_NAME } from "constants/SCREEN_NAME";
import { RootTabScreenProps } from "types";

type Props = {
  item: PostListModel;
  isLoading: boolean;
  navigation: any;
} & Omit<RootTabScreenProps<typeof MYPAGE_SCREEN_NAME.MAIN>, "route">;

const Component: FC<Props> = ({ item, isLoading, navigation }) => {
  const renderCard = () => {
    if (isLoading) {
      return <Loadable />;
    } else {
      return (
        <Pressable
          onPress={() =>
            navigation.navigate(MYPAGE_SCREEN_NAME.DETAIL, {
              item,
            })
          }
        >
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
  height: ${windowWidth * 0.428 * 1.3333 + "px"};
`;
