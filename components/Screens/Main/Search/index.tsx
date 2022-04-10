import * as React from "react";
import { useEffect, useState } from "react";

import ContentLayout from "components/Layout/ContentLayout";
import ErrorMsg from "components/Shared/ErrorMsg";
import Loadable from "components/Shared/Loadable";
import { observer } from "mobx-react";
import Typography from "components/Shared/Typography";
import { InputAccessoryView, View, Text } from "react-native";
import { CREATE_SCREEN_NAME, MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import Form from "components/Shared/Form";
import Input from "components/Shared/Input";
import SearchDto from "~domain/dto/SearchDto";
import SubmitButton from "components/Shared/SubmitButton";
import styled from "styled-components/native";
import theme from "themes";
import Button from "components/Shared/Button";
import FlexBox from "components/Shared/FlexBox";
import Divider from "components/Shared/Divider";
import Interval from "components/Shared/Interval";
import { runInAction } from "mobx";
import { windowWidth } from "constants/Layout";
import { getRootViewModel } from "~components/Screens/VmManager";
import { RootTabScreenProps } from "types";
import SearchViewModel from "./Search.vm";
import KeyboardAvoiding from "~components/Layout/KeyboardLayout";

const SearchScreen = ({
  navigation,
}: RootTabScreenProps<typeof MAIN_SCREEN_NAME.SEARCH>) => {
  const vm = getRootViewModel<SearchViewModel>(
    (viewModel) => viewModel.tab.Search
  );

  const handlePress = (placeId: string) => {
    // runInAction(() => vm.selectPlace(placeId));
    // navigation.navigate("CreatePost");
  };

  const onSubmit = (data: any) =>
    console.log("등록 화면으로 이동합니다..", data);

  // TODO : 추후 BottomBar를 숨겨줘야 합니다.

  return (
    <KeyboardAvoiding>
      <ContentBox>
        {/* {vm.searchedList &&
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
          })} */}
      </ContentBox>
      <ButtonBox>
        {/* {vm.searchedWord && (
          <StyledButton
            label={`${`"${vm.searchedWord}" 등록하기`}`}
            color={theme.colors.primary.main}
            onPress={onSubmit}
          />
        )} */}
      </ButtonBox>
    </KeyboardAvoiding>
  );
};

export default observer(SearchScreen);

const ContentLayoutWrapper = styled(ContentLayout)`
  padding: 16px 24px 0px 24px;
  width: ${windowWidth + "px"};
`;

const Content = styled.Pressable``;

const ContentBox = styled.ScrollView`
  flex: 11.5;
`;

const Title = styled(Typography)`
  color: #121212;
`;

const Description = styled(Typography)`
  color: ${({ theme }) => theme.colors.grey[99]};
`;

const StyledInputAccessoryView = styled(InputAccessoryView)`
  flex: 1;
`;

const ButtonBox = styled(FlexBox)`
  flex: 1;
  align-items: flex-end;
`;

const StyledButton = styled(Button)`
  border-radius: 6px;
`;
