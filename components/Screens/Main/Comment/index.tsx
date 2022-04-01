import * as React from "react";
import { useEffect } from "react";

import ContentLayout from "components/Layout/ContentLayout";
import ErrorMsg from "components/Shared/ErrorMsg";
import Loadable from "components/Shared/Loadable";
import CommentViewModel from "./Comment.vm";
import { observer } from "mobx-react";
import Typography from "components/Shared/Typography";
import { RootTabScreenProps } from "types";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import Flex from "components/Shared/FlexBox";
import Avatar from "components/Shared/Avatar";
import DropDownMenu from "components/Shared/DropDownMenu";
import Divider from "components/Shared/Divider";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Interval from "components/Shared/Interval";
import timeForToday from "helper/Formatter/CalculateDayBefore";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import { getRootViewModel } from "~components/Screens/VmManager";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.COMMENT>) => {
  const vm = getRootViewModel<CommentViewModel>(
    (viewModel) => viewModel.tab.Comment
  );

  if (vm.isLoading) {
    return <Loadable />;
  }

  if (vm.isError) {
    return <ErrorMsg />;
  }

  return (
    <CommentLayout
      justifyContent="flex-start"
      alignItems="flex-start"
      hasHeader
    >
      <CommentBox>
        {vm.comments.map((item) => {
          return (
            <View key={item.id}>
              <Flex>
                <LeftContentBox>
                  {/* TODO : Avatar 이미지가 nullable인가? */}
                  <Avatar imageSource={item.user.avatar?.filePath || ""} />
                </LeftContentBox>
                <Interval width="8px" />
                <RightContentBox>
                  <UserFlexBox>
                    <Flex>
                      <Text>{item.user.name}</Text>
                      <Interval width="8px" />
                      <GreyTypo>{timeForToday(item.createDateTime)}</GreyTypo>
                    </Flex>
                    <View>
                      <DropDownMenu />
                    </View>
                  </UserFlexBox>
                  {/* FIXME : Comment 줄바꿈 */}
                  <CommentContentBox>
                    <Text>{item.content}</Text>
                  </CommentContentBox>
                  {/* TODO : 서버에서 값을 뿌려줘야 함 */}
                  <LikeContentBox>
                    <GreyTypo>좋아요 --개</GreyTypo>
                    <Interval width="6px" />
                    <Divider orientation="Vertical" />
                    <Interval width="6px" />
                    {/* TODO : 기능 연결 필요*/}
                    <TouchableWithoutFeedback
                      onPress={() => console.log("답글쓰기")}
                    >
                      <GreyTypo>답글쓰기</GreyTypo>
                    </TouchableWithoutFeedback>
                  </LikeContentBox>
                </RightContentBox>
              </Flex>
              <Interval height="16px" />
              <Divider orientation="Horizontal" color="#F9F9F9" />
              <Interval height="16px" />
            </View>
          );
        })}
      </CommentBox>
      {/* TODO : 댓글 생성 UI 구성 필요 */}
    </CommentLayout>
  );
};

export default observer(MyPageScreen);

const CommentLayout = styled(ContentLayout)`
  padding: 16px 24px 0px 24px;
  background-color: white;
`;

const GreyTypo = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[99]};
`;

const CommentBox = styled.ScrollView``;

const LeftContentBox = styled.View``;

const RightContentBox = styled.View``;

const UserFlexBox = styled(Flex)`
  justify-content: space-between;
`;

const CommentContentBox = styled(Flex)`
  margin: 8px 12px 8px 0px;
`;

const LikeContentBox = styled(Flex)``;

const Comment = styled(View)`
  padding-right: 36px;
`;
