import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import Image from "components/Shared/Image";
import Typography from "components/Shared/Typography";
import PostListModel from "~domain/model/Local/PostListModel";
import Layout from "constants/Layout";

export type Props = {
  item: PostListModel;
  setIsFront: (data: boolean) => void;
};

const {
  window: { width: windowWidth, height: windowHeight },
} = Layout;

const PhotoCard = ({ item, setIsFront }: Props) => {
  return (
    <PhotoFrame>
      <PhotoContent>
        <TouchableWithoutFeedback onPress={() => setIsFront(false)}>
          {/* TODO : 캐로젤로 변경해줄 필요가 있음 */}
          <MainImage source={{ uri: item.imageLocations[0] }} />
        </TouchableWithoutFeedback>
        <PhotoDate>
          <PhotoDateTypo type="Number" variant="digit">
            {item.date}
          </PhotoDateTypo>
        </PhotoDate>
      </PhotoContent>
    </PhotoFrame>
  );
};

export default PhotoCard;

const PhotoFrame = styled.View`
  background-color: #fff;
  padding: 30px 16px 16px 16px;
  width: ${windowWidth * 0.936 + "px"};
  height: ${windowHeight * 0.647 + "px"};
`;

const PhotoContent = styled.View`
  margin: 0 auto 106px auto;
  width: ${windowWidth * 0.85 + "px"};
  height: ${windowHeight * 0.48 + "px"};
`;

const MainImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const PhotoDate = styled.View`
  margin-left: auto;
  margin-top: 73px;
`;

const PhotoDateTypo = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[77]};
`;
