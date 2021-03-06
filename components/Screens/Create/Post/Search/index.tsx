import * as React from "react";
import { useEffect, useState } from "react";

import ContentLayout from "~components/Layout/ContentLayout";
import ErrorMsg from "~components/Shared/ErrorMsg";
import Loadable from "~components/Shared/Loadable";
import { observer } from "mobx-react";
import Typography from "~components/Shared/Typography";
import { InputAccessoryView, View } from "react-native";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import CreatePostViewModel from "../CreatePost.vm";
import Form from "~components/Shared/Form";
import Input from "~components/Shared/Input";
import SearchDto from "~domain/dto/SearchDto";
import SubmitButton from "~components/Shared/SubmitButton";
import styled from "styled-components/native";
import theme from "themes";
import Button from "~components/Shared/Button";
import FlexBox from "~components/Shared/FlexBox";
import Divider from "~components/Shared/Divider";
import Interval from "~components/Shared/Interval";
import { runInAction } from "mobx";
import { windowWidth } from "constants/Layout";
import { getRootViewModel } from "~components/Screens/VmManager";
import { RootTabScreenProps } from "types";
import KeyboardAvoding from "~components/Layout/KeyboardLayout";

const MyPageScreen = ({
  navigation,
}: RootTabScreenProps<typeof CREATE_SCREEN_NAME.SEARCH>) => {
  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );

  const handlePress = (placeId: string) => {
    runInAction(() => {
      vm.selectPlace(placeId);
      vm.formReset(true);
    });
    navigation.navigate("CreatePost");
  };

  const onSubmit = (data: any) =>
    console.log("등록 화면으로 이동합니다..", data);

  // TODO : 추후 BottomBar를 숨겨줘야 합니다.
  return (
    <KeyboardAvoding justifyContent="flex-end">
      <ContentBox hasBottomButton={!!vm.searchedWord}>
        {vm.searchedList &&
          vm.searchedList.map((item) => {
            return (
              <Content
                key={item.placeId}
                onPress={() => handlePress(item.placeId)}
              >
                <Interval height="16px" />
                <Title variant="subhead-regular">{item.placeName}</Title>
                <Interval height="1px" />
                <Description variant="caption-regular">
                  {item.address}
                </Description>
                <Interval height="16px" />
                <Divider orientation="Horizontal" />
              </Content>
            );
          })}
      </ContentBox>
      <ButtonBox>
        {vm.searchedWord && (
          <StyledButton
            label={`${`"${vm.searchedWord}" 등록하기`}`}
            color={theme.colors.primary.main}
            onPress={onSubmit}
          />
        )}
      </ButtonBox>
    </KeyboardAvoding>
  );
};

export default observer(MyPageScreen);

const Content = styled.Pressable``;

const ContentBox = styled.ScrollView<{ hasBottomButton: boolean }>`
  width: ${windowWidth + "px"};
  padding: 16px 24px 32px 24px;
  margin-bottom: ${({ hasBottomButton }) => (hasBottomButton ? "5px" : "0px")};
`;

const Title = styled(Typography)`
  color: #121212;
`;

const Description = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[99]};
`;

const ButtonBox = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button).attrs({
  width: "87.2%",
  height: "54px",
})`
  border-radius: 6px;
`;
