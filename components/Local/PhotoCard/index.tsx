import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";
import Image from "components/Shared/Image";
import Typography from "components/Shared/Typography";
import { dateFormatter } from "helper/Formatter/DateFormatter";
import FlexBox from "components/Shared/FlexBox";
import PostListModel from "~domain/model/Local/PostListModel";
import Carousel from "~components/Shared/Carousel";

export type Props = {
  item: PostListModel;
  setIsFront: (data: boolean) => void;
};

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

// TODO : 디바이스 별 사이즈 비율에 맞춰서 간격 구성 필요함.
const Wrapper = styled.View`
  background-color: #f1f1f1;
  padding: 32px 12px 32px 12px;
`;

const PhotoHeader = styled(FlexBox)`
  justify-content: space-between;
  margin-bottom: 12px;
`;

const IconSection = styled(FlexBox)``;

const IconBox = styled.View`
  margin-right: 14px;
`;

const DropDownBox = styled.View`
  margin-right: 12px;
`;

// TODO : width를 비율로 변경해야 함.
const PhotoFrame = styled.View`
  background-color: #fff;
  padding: 30px 16px 16px 16px;
`;

// TODO : width를 비율로 변경해야 함.
const PhotoContent = styled.View`
  margin: 0 auto 106px auto;
  width: 319px;
  height: 390px;
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
