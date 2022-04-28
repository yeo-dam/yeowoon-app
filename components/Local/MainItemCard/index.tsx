import React, { FC, useState } from "react";
import styled from "styled-components/native";
import PhotoCard from "~components/Local/PhotoCard";
import DescriptionCard from "~components/Local/DescriptionCard";
import PhotoContainer from "~components/Local/PhotoContainer";
import { Animated, View } from "react-native";
import DoubleTap from "~components/Shared/DoubleTap";
import MainViewModel from "~components/Screens/Main/Main.vm";
import Loadable from "~components/Shared/Loadable";
import PostListModel from "~domain/model/Local/PostListModel";
import { getRootViewModel } from "~components/Screens/VmManager";

type Props = {
  item: PostListModel;
  isLoading: boolean;
  addLikes?: (postId: string, userId: string) => void;
  deleteLikes?: (postId: string, userId: string) => void;
  navigation: any;
};

const Component: FC<Props> = ({
  item,
  isLoading,
  navigation,
  addLikes,
  deleteLikes,
}) => {
  const [isFront, setIsFront] = useState<boolean>(true);
  const { id: userId } = getRootViewModel((vm) => vm.auth.user);

  let animatedValue = new Animated.Value(0);

  const handleLike = () => {
    if (addLikes) {
      addLikes(item.postId, userId);
    }
  };

  const handleDislike = () => {
    if (deleteLikes) {
      deleteLikes(item.postId, userId);
    }
  };

  const renderOverlay = () => {
    return (
      <OverlayBox>
        <Animated.Image
          source={require("~assets/images/Big_Heart.png")}
          style={{
            width: 95,
            height: 100,
            tintColor: "#fff",
            opacity: animatedValue,
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1.5],
                }),
              },
            ],
          }}
        />
      </OverlayBox>
    );
  };

  const renderCard = (postItem: PostListModel, router: any) => {
    if (isLoading) {
      return <Loadable />;
    } else {
      if (isFront) {
        return (
          <PhotoContainer item={item}>
            <DoubleTap
              delay={1500}
              requestToggleLike={handleLike}
              animatedValue={animatedValue}
              setIsFront={setIsFront}
            >
              <PhotoCard item={postItem} setIsFront={setIsFront} />
              {renderOverlay()}
            </DoubleTap>
          </PhotoContainer>
        );
      } else {
        return (
          <PhotoContainer item={item}>
            <DescriptionCard
              item={postItem}
              navigation={router}
              handleDeleteLike={handleDislike}
              setIsFront={setIsFront}
            />
          </PhotoContainer>
        );
      }
    }
  };

  return <View>{renderCard(item, navigation)}</View>;
};

export default Component;

const OverlayBox = styled.View`
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
