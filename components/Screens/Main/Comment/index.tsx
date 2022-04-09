import * as React from "react";

import ContentLayout from "~components/Layout/ContentLayout";
import CommentViewModel from "./Comment.vm";
import { observer } from "mobx-react";
import Typography from "~components/Shared/Typography";
import { RootTabScreenProps } from "types";
import { View, Text, Pressable } from "react-native";
import styled from "styled-components/native";
import Flex from "~components/Shared/FlexBox";
import Avatar from "~components/Shared/Avatar";
import DropDownMenu from "~components/Shared/DropDownMenu";
import Divider from "~components/Shared/Divider";
import Interval from "~components/Shared/Interval";
import timeForToday from "helper/Formatter/CalculateDayBefore";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import { getRootViewModel } from "~components/Screens/VmManager";
import { useEffect } from "react";
import KeyboardAvoding from "~components/Layout/KeyboardLayout";
import FlexBox from "components/Shared/FlexBox";
import Button from "~components/Shared/Button";
import theme from "themes";
import Input from "~components/Shared/Input";
import CreateCommentDto from "~domain/dto/CreateCommentDto";
import Form from "~components/Shared/Form";

const MyPageScreen = ({
  navigation,
  route,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.COMMENT>) => {
  const vm = getRootViewModel<CommentViewModel>(
    (viewModel) => viewModel.tab.Comment
  );

  // if (vm.isLoading) {
  //   return <Loadable />;
  // }

  // if (vm.isError) {
  //   return <ErrorMsg />;
  // }

  useEffect(() => {
    async function loadComments() {
      if (route.params) {
        const postId = (route.params as any)?.postId;
        await vm.load(postId, { pageNum: 0 });
      }
    }
    loadComments();
  }, []);

  return (
    <KeyboardAvoding justifyContent="flex-start" alignItems="flex-start">
      <CommentBox>
        {vm.comments.map((item) => {
          return (
            <View key={item.id}>
              <Flex>
                <LeftContentBox>
                  <Avatar imageSource={item.user.userImage?.url} />
                </LeftContentBox>
                <Interval width="8px" />
                <RightContentBox>
                  <UserFlexBox>
                    <Flex>
                      <Text>{item.user.userName}</Text>
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
                    <Pressable onPress={() => console.log("답글쓰기")}>
                      <GreyTypo>답글쓰기</GreyTypo>
                    </Pressable>
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
      <CreateComment>
        <Form schema={CreateCommentDto}>
          <InnerWrapper>
            <Input name="comment" />
            <StyledButton
              label={"등록하기"}
              color={theme.colors.primary.main}
              onPress={() => console.log("hello")}
            />
          </InnerWrapper>
        </Form>
      </CreateComment>
    </KeyboardAvoding>
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

const CreateComment = styled(FlexBox)`
  flex: 1;
  border: 1px solid red;
`;

const StyledButton = styled(Button)`
  border-radius: 6px;
`;

const InnerWrapper = styled(FlexBox)`
  align-items: flex-end;
  width: 100%;
`;
