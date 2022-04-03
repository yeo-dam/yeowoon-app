import React from "react";
import styled from "styled-components/native";
import { Pressable, View } from "react-native";
import Typography from "components/Shared/Typography";
import { FollowerNum } from "helper/Formatter/FollowerNumFormatter";
import PlaceTypeFormatter from "helper/Formatter/PlaceTypeFormatter";
import FlexBox from "components/Shared/FlexBox";
import Divider from "components/Shared/Divider";
import { Props as PhotoCardProps } from "../PhotoCard";
import Interval from "components/Shared/Interval";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import Layout from "constants/Layout";

export type Props = {
  navigation: any;
} & PhotoCardProps;

const {
  window: { width: windowWidth, height: windowHeight },
} = Layout;

const Component = ({ item, setIsFront, navigation }: Props) => {
  const handlePress = () => navigation.push(MAIN_SCREEN_NAME.MAP);

  return (
    <Pressable onPress={() => setIsFront(true)}>
      <PhotoFrame>
        <PhotoBox>
          <ContentBox>
            <Pressable onPress={handlePress}>
              <View>
                <WhiteTitleTypo>{item.title}</WhiteTitleTypo>
                <Interval height="8px" />
                <GreyFlexBox>
                  <GreyBlackTypo>
                    {PlaceTypeFormatter(item.place.placeType)}
                  </GreyBlackTypo>
                  <Interval width="4px" />
                  <Divider orientation="Vertical" />
                  <Interval width="4px" />
                  <GreyBlackTypo>{item.place.address}</GreyBlackTypo>
                  {/* TODO : 아이콘 추가 필요 */}
                  {/* <BiChevronRight color="#AAAAAA" size={12} /> */}
                </GreyFlexBox>
              </View>
            </Pressable>
            <Interval height="20px" />
            <WhiteTypo>{item.description}</WhiteTypo>
            <Interval height="8px" />
            <TagFlexBox>
              {item.tags &&
                item.tags.map((tag, idx) => (
                  <TagTypo key={idx}>{`#${tag} `}</TagTypo>
                ))}
            </TagFlexBox>
          </ContentBox>
          <Divider />
          <CommentBox>
            <GreyTypo>{item.likeCount} 명</GreyTypo>
            <Interval height="6px" />
            <Pressable
              onPress={() => navigation.navigate(MAIN_SCREEN_NAME.COMMENT)}
            >
              {/* FIXME : 댓글을 표현하는 순서가 변경되어야 할 것임. */}
              <GreyTypo>
                {item.comments &&
                  `${
                    (item.comments[0].user.userName, item.comments[0].content)
                  }`}
              </GreyTypo>
            </Pressable>
          </CommentBox>
        </PhotoBox>
      </PhotoFrame>
    </Pressable>
  );
};

const PhotoFrame = styled(View)`
  background-color: ${({ theme }) => theme.colors.background.paper};
  height: ${windowHeight * 0.647 + "px"};
  padding: 30px 16px 16px 16px;
`;

const PhotoBox = styled(View)<{ isFront?: boolean }>`
  display: flex;
  justify-content: flex-end;
  width: ${windowWidth * 0.85 + "px"};
  height: ${windowHeight * 0.48 + "px"};
  background-color: ${({ theme }) => theme.colors.grey.black};
`;

const GreyFlexBox = styled(FlexBox)``;

const TagFlexBox = styled(FlexBox)``;

const ContentBox = styled.View`
  padding: 16px;
`;

const CommentBox = styled.View`
  padding: 16px;
`;

const TagTypo = styled(Typography).attrs({ variant: "caption-regular" })`
  color: ${({ theme }) => theme.colors.primary.point};
`;

const GreyBlackTypo = styled(Typography).attrs({
  variant: "caption-light",
})`
  color: ${({ theme }) => theme.colors.grey.AA};
`;

const GreyTypo = styled(Typography)`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.grey.EE};
`;

const WhiteTypo = styled(Typography)`
  color: ${({ theme }) => theme.colors.background.paper};
`;

const WhiteTitleTypo = styled(WhiteTypo).attrs({
  variant: "subhead-medium",
})``;

export default Component;
