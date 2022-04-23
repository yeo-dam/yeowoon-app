import * as React from "react";

import CommentViewModel from "./Comment.vm";
import { observer } from "mobx-react";
import Typography from "~components/Shared/Typography";
import { RootTabScreenProps } from "types";
import {
  View,
  Pressable,
  InputAccessoryView,
  ScrollView,
  TextInput,
} from "react-native";
import styled from "styled-components/native";
import Flex from "~components/Shared/FlexBox";
import Avatar from "~components/Shared/Avatar";
import DropDownMenu from "~components/Shared/DropDownMenu";
import Divider from "~components/Shared/Divider";
import Interval from "~components/Shared/Interval";
import timeForToday from "helper/Formatter/CalculateDayBefore";
import { MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import { getRootViewModel } from "~components/Screens/VmManager";
import { useCallback, useEffect, useRef, useState } from "react";
import KeyboardAvoding from "~components/Layout/KeyboardLayout";
import FlexBox from "~components/Shared/FlexBox";
import theme from "themes";
import Input from "~components/Shared/Input";
import CreateCommentDto from "~domain/dto/CreateCommentDto";
import SubmitButton from "~components/Shared/SubmitButton";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useModalContext } from "navigation/modalContext";
import PopUpContainer from "~components/Shared/PopUpContainer";

const MyPageScreen = ({
  navigation,
  route,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.COMMENT>) => {
  const vm = getRootViewModel<CommentViewModel>(
    (viewModel) => viewModel.tab.Comment
  );
  const [selectedComment, selectComment] = useState<{
    commentId: string;
    commentIdx?: number;
  }>({
    commentId: "",
    commentIdx: 0,
  });
  const { isModalOpen, openModal, closeModal } = useModalContext();
  const inputRef = useRef<TextInput>();

  const resolver = classValidatorResolver(CreateCommentDto);
  const form = useForm<CreateCommentDto>({
    resolver,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    async function loadComments() {
      if (route.params) {
        const postId = (route.params as any)?.postId;
        await vm.load(postId, { pageNum: 0 });
      }
    }
    loadComments();
  }, []);

  const handleSubmit = async (dto: CreateCommentDto) => {
    if (route.params) {
      const postId = (route.params as any)?.postId;
      await vm.addComment(
        postId,
        dto.comment,
        Number(selectedComment.commentId)
      );
      selectComment({
        commentId: "",
        commentIdx: 0,
      });
      form.reset();
    }
  };

  const onCommentSelect = (commentId: string) => {
    // console.log(`TCL ~ [index.tsx] ~ line ~ 75 ~ commentId`, commentId);
    // console.log(`TCL ~ [index.tsx] ~ line ~ 78 ~ inputRef`, inputRef);
    // inputRef.current.focus();
    // 여기서 Comment Input에 Focusing 줄 것.
    // console.log(`TCL ~ [index.tsx] ~ line ~ 76 ~ form.watch()`, form);
    // form.setFocus("comment")
    // 그러나 CommentId가 항상 select 되어 있으면 안됨.
  };

  const onCommentUpdate = async (commentId: string) => {
    // await vm.updateComment(commentId);
  };

  const onCommentDelete = async (commentId: string) => {
    await vm.deleteComment(commentId);
  };

  const onModalOpen = (commentId: string, commentIdx: number) => {
    selectComment({ commentId, commentIdx });
    openModal();
  };

  const renderComments = () => {
    const multiLine = vm.comments.map((comment) => {
      const commentLength = comment.content.length;
      return commentLength > 25 ? Math.floor(commentLength / 25) : 0;
    });
    return (
      <View>
        {vm.comments.map((item, index) => {
          return (
            <View key={item.commentId}>
              <Flex>
                <LeftContentBox>
                  <Avatar imageSource={item?.user?.userImage} />
                </LeftContentBox>
                <RightContentBox>
                  <UserFlexBox>
                    <Flex>
                      <Typography>{item?.user?.userName}</Typography>
                      <Interval width="8px" />
                      <GreyTypo>{timeForToday(item.createdDateTime)}</GreyTypo>
                    </Flex>
                    <PopUpContainer
                      closeModal={closeModal}
                      modalVisible={isModalOpen}
                      commentId={selectedComment.commentId}
                      multiLine={multiLine}
                      order={selectedComment.commentIdx || 0}
                      openModal={() => onModalOpen(item.commentId, index)}
                    >
                      <DropDownMenu />
                    </PopUpContainer>
                  </UserFlexBox>
                  <CommentContentBox>
                    <Typography>{item.content}</Typography>
                  </CommentContentBox>
                  <LikeContentBox>
                    <GreyTypo>좋아요 {item.likeCount}개</GreyTypo>
                    <Interval width="6px" />
                    <Divider orientation="Vertical" />
                    <Interval width="6px" />
                    <Pressable onPress={() => onCommentSelect(item.commentId)}>
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
      </View>
    );
  };
  return (
    <KeyboardAvoding
      justifyContent="flex-start"
      alignItems="flex-start"
      addictionalBarHeight={12}
    >
      <CommentBox>{renderComments()}</CommentBox>
      <FormProvider {...form}>
        <InnerWrapper>
          <Input
            FullWidth
            name="comment"
            height="40px"
            placeholder="댓글을 남겨보세요"
            placeholderTextColor={theme.colors.grey.AA}
            inputAccessoryViewID={MAIN_SCREEN_NAME.COMMENT}
          />
        </InnerWrapper>
        <InputAccessoryView nativeID={MAIN_SCREEN_NAME.COMMENT}>
          <FlexBox>
            <SubmitButton
              width="100px"
              label={"등록하기"}
              color={theme.colors.primary.main}
              onSubmit={handleSubmit}
            />
          </FlexBox>
        </InputAccessoryView>
      </FormProvider>
    </KeyboardAvoding>
  );
};

export default observer(MyPageScreen);

const CommentBox = styled(ScrollView)`
  flex: 1;
  padding: 16px 24px 0px 24px;
  background-color: ${({ theme }) => theme.colors.background.paper};
`;

const LeftContentBox = styled.View`
  min-width: 24px;
`;

const RightContentBox = styled.View`
  flex: 1;
`;

const UserFlexBox = styled(Flex)`
  justify-content: space-between;
`;

const CommentContentBox = styled(Flex)`
  margin: 8px 12px 8px 0px;
`;

const LikeContentBox = styled(Flex)``;

const InnerWrapper = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  padding-left: 24px;
`;

const GreyTypo = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[99]};
`;
