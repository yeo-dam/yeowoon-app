import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { InputAccessoryView, Pressable, View } from "react-native";
import { RootTabScreenProps } from "types";
import { CREATE_SCREEN_NAME, MAIN_SCREEN_NAME } from "constants/SCREEN_NAME";
import BackPushLogo from "~assets/Icons/Back.svg";
import Interval from "~components/Shared/Interval";
import FlexBox from "~components/Shared/FlexBox";
import SearchLogo from "~assets/Icons/SearchIcon.svg";
import Input from "~components/Shared/Input";
import theme from "themes";
import Button from "~components/Shared/Button";
import { FormProvider, UseFormReturn } from "react-hook-form";
import FindPlaceDto from "~domain/dto/FindPlaceDto";
import SubmitButton from "~components/Shared/SubmitButton";

type Props = {
  form: UseFormReturn<FindPlaceDto, any>;
  onSubmit: (inputValue: string) => void;
  handleNavigate: () => void;
};

const Component: FC<Props> = ({ form, handleNavigate, onSubmit }) => {
  const handleOnChange = (keyword: string) => {
    setTimeout(() => {
      if (keyword) {
        onSubmit(keyword);
      }
    }, 1000);
  };

  return (
    <>
      <Pressable onPress={handleNavigate}>
        <BackPushLogo />
      </Pressable>
      <Interval width="10px" />
      <FormProvider {...form}>
        <SearchBox>
          <IconBox>
            <SearchLogo />
          </IconBox>
          <Input
            name="placeName"
            placeholderTextColor="#999999"
            handleOnChange={handleOnChange}
            placeholder="장소 이름 검색"
            FullWidth
            height="30px"
            inputAccessoryViewID={CREATE_SCREEN_NAME.SEARCH}
          />
        </SearchBox>
        <InputAccessoryView nativeID={CREATE_SCREEN_NAME.SEARCH}>
          <SubmitButton
            label="검색하기"
            onSubmit={onSubmit}
            color={theme.colors.grey.AA}
          />
        </InputAccessoryView>
      </FormProvider>
    </>
  );
};

export default Component;

const SearchBox = styled(FlexBox)`
  flex: 1;
  height: 40px;
  margin-right: 42.5px;
  align-items: center;
  align-self: stretch;
  padding: 12px;
  background-color: #f9f9f9;
  border: 1px solid grey;
  border-radius: 15px;
`;

const IconBox = styled.View`
  margin-right: 8px;
`;
