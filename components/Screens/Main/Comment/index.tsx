import * as React from "react";

import CommentViewModel from "./Comment.vm";
import { observer } from "mobx-react";
import Typography from "~components/Shared/Typography";
import { RootTabScreenProps } from "types";
import {
  View,
  Text,
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
import { useEffect, useRef, useState } from "react";
import KeyboardAvoding from "~components/Layout/KeyboardLayout";
import FlexBox from "~components/Shared/FlexBox";
import theme from "themes";
import Input from "~components/Shared/Input";
import CreateCommentDto from "~domain/dto/CreateCommentDto";
import SubmitButton from "~components/Shared/SubmitButton";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useModalContext } from "navigation/modalContext";
import Popup from "~components/Shared/Popup";
import PopUpContainer from "~components/Shared/PopUpContainer";
import DropDownContainer from "~components/Shared/DropDownContainer";
import UpdateCommentDto from "~domain/dto/UpdateCommentDto";

const MyPageScreen = ({
  navigation,
  route,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.COMMENT>) => {
  const vm = getRootViewModel<CommentViewModel>(
    (viewModel) => viewModel.tab.Comment
  );
  const [selectedCommentId, setCommentId] = useState<string>("");
  const { isModalOpen, openModal, closeModal } = useModalContext();
  const inputRef = useRef<TextInput>();

  console.log(`TCL ~ [index.tsx] ~ line ~ 47 ~ inputRef`, inputRef);

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
      await vm.addComment(postId, dto.comment, Number(selectedCommentId));
      setCommentId("");
      form.reset();
    }
  };

  const onCommentSelect = (commentId: string) => {
    setCommentId(commentId);
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
    console.log(`TCL ~ [index.tsx] ~ line ~ 94 ~ commentId`, commentId);

    await vm.deleteComment(commentId);
  };

  console.log(`TCL ~ [index.tsx] ~ line ~ 99 ~ vm.comments`, vm.comments);

  const renderComments = () => {
    return (
      <View>
        {vm.comments.map((item) => {
          console.log(`TCL ~ [index.tsx] ~ line ~ 105 ~ item`, item.commentId);

          return (
            <View key={item.commentId}>
              <Flex>
                <LeftContentBox>
                  <Avatar imageSource={item?.user?.userImage} />
                </LeftContentBox>
                <RightContentBox>
                  <UserFlexBox>
                    <Flex>
                      <Text>{item?.user?.userName}</Text>
                      <Interval width="8px" />
                      <GreyTypo>{timeForToday(item.createdDateTime)}</GreyTypo>
                    </Flex>
                    <DropDownContainer
                      animationType={"slide"}
                      modalVisible={isModalOpen}
                      openModal={openModal}
                      closeModal={closeModal}
                      content={
                        <PopupWrapper>
                          <Pressable
                            onPress={() => console.log(item.commentId)}
                          >
                            <FlexBox>
                              <DropDownTypo>삭제</DropDownTypo>
                            </FlexBox>
                          </Pressable>
                          {/* <Interval height="24px" />
                          <Pressable
                            onPress={() => onCommentUpdate(item.commentId)}
                          >
                            <FlexBox>
                              <DropDownTypo>수정</DropDownTypo>
                            </FlexBox>
                          </Pressable> */}
                          <Interval height="24px" />
                          <Pressable onPress={() => console.log("신고")}>
                            <FlexBox>
                              <DropDownTypo>신고</DropDownTypo>
                            </FlexBox>
                          </Pressable>
                        </PopupWrapper>
                      }
                    >
                      <DropDownMenu />
                    </DropDownContainer>
                  </UserFlexBox>
                  <CommentContentBox>
                    <Text>{item.content}</Text>
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

const PopupWrapper = styled.View`
  flex: 1;
`;

const DropDownTypo = styled(Typography).attrs({ variant: "subhead-regular" })``;
