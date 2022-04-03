import * as React from "react";
import Image from "components/Shared/Image";
import { observer } from "mobx-react";
import Typography from "components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
  StyleSheet,
  Keyboard,
} from "react-native";
import Input from "components/Shared/Input";
import FormLayout from "components/Layout/FormLayout";
import Form from "components/Shared/Form";
import CreatePostDto from "~domain/dto/CreatePostDto";
import CreatePostViewModel from "./CreatePost.vm";
import Interval from "components/Shared/Interval";
import Flex from "components/Shared/FlexBox";
import PlaceType from "~domain/enum/PlaceType";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import DescriptionForm from "components/Local/DescriptionForm";
import ImageForm from "components/Local/ImageForm";
import Layout from "constants/Layout";
import { getRootViewModel } from "~components/Screens/VmManager";
import { FormProvider, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useEffect } from "react";
import { runInAction } from "mobx";
import KeyboardAvoiding from "~components/Shared/KeyboardAvoiding";

const {
  window: { width: windowWidth, height: windowHeight },
} = Layout;

const CreatePost = ({
  navigation,
}: RootTabScreenProps<typeof CREATE_SCREEN_NAME.POST>) => {
  const resolver = classValidatorResolver(CreatePostDto);
  const form = useForm<CreatePostDto>({
    resolver,
    defaultValues: {
      place: {
        placeId: undefined,
        placeName: undefined,
        type: undefined,
      },
      description: undefined,
      tags: [],
      inputDateTime: undefined,
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const vm = getRootViewModel<CreatePostViewModel>(
    (viewModel) => viewModel.tab.Post
  );

  if (vm.resetTrigger) {
    form.reset();
    runInAction(() => vm.formReset(false));
  }

  const onSubmit = async (data: CreatePostDto) => {
    // 이미지 미업로드시 막아줘야 함.
    if (vm.uploadedImages.length === 0) {
      form.setError("images", {
        message: "이미지를 입력해주세요",
      });
      runInAction(() => vm.setFront(true));
      return;
    }

    // 장소 미선택시 업로드를 막아줘야 함.
    if (!vm.selectedPlace) {
      form.setError("place.placeName", {
        message: "장소를 선택해주세요.",
      });
      return;
    }

    const dateTime = data.inputDateTime;
    const year = dateTime.slice(0, 4);
    const month = dateTime.slice(4, 6);
    const day = dateTime.slice(6, 8);
    const transformed = `${year}.${month}.${day}`;
    const ImageIds = vm.uploadedImages.map((item) => item.id);
    const newTags = data.tags.filter((tag) => tag !== "");
    const formmatedDto: CreatePostDto = {
      ...data,
      place: { ...vm.selectedPlace, type: data.place.type },
      tags: newTags,
      date: transformed,
      images: ImageIds,
    };

    console.log(`formmatedDto >>> `, formmatedDto);

    try {
      const id = await vm.createPost({ body: formmatedDto });
      if (id) {
        vm.resetUploadImages();
        vm.resetSelctedPlace();
        form.reset();
        navigation.push("Root");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderForm = () => {
    if (vm.isFront) {
      return <ImageForm vm={vm} navigation={navigation} />;
    } else {
      return (
        <View>
          <DescriptionBox>
            <DescriptionForm
              vm={vm}
              navigation={navigation}
              onSubmit={onSubmit}
            />
          </DescriptionBox>
        </View>
      );
    }
  };

  return (
    <KeyboardAvoiding>
      <FormProvider {...form}>
        <FormWrapper>
          <Wrapper>
            <InnerWrapper>{renderForm()}</InnerWrapper>
          </Wrapper>
        </FormWrapper>
        <DateFlexBox>
          <DateInput
            maxLength={8}
            height="20px"
            name="inputDateTime"
            placeholder="날짜(YYYY-MM-DD)를 입력해주세요"
            keyboardType="number-pad"
            inputAccessoryViewID={CREATE_SCREEN_NAME.POST}
          />
        </DateFlexBox>
      </FormProvider>
    </KeyboardAvoiding>
  );
};

export default observer(CreatePost);

const Wrapper = styled.View`
  margin: 0 auto;
  background-color: white;
`;

const InnerWrapper = styled.View`
  padding: 32px 16px 104px 16px;
`;

const FormWrapper = styled(Flex)`
  flex: 1;
`;

const DateInput = styled(Input)`
  border: 1px solid blue;
`;

const TitleBox = styled(Flex)`
  justify-content: center;
  width: 100%;
  padding: 0px 0px 16px 0px;
`;

const DateFlexBox = styled(Flex)`
  justify-content: flex-end;
  padding-bottom: 70px;
  border: 1px solid red;
`;

const DescriptionBox = styled(View)`
  justify-content: center;
  width: ${windowWidth * 0.85 + "px"};
  height: ${windowHeight * 0.48 + "px"};
  background-color: ${({ theme }) => theme.colors.grey.black};
  border: 1px solid red;
`;

const DescriptionInnerBox = styled.View`
  padding: 0px 12px 16px 12px;
`;

const ImageUploadText = styled(Typography)`
  color: #aaaaaa;
`;

const NoImageComponent = styled(Image)``;

const DropDownTypo = styled(Typography).attrs({ variant: "subhead-medium" })``;

const PlaceTypeBox = styled(Flex)`
  justify-content: space-around;
`;

const GreyTypo = styled(Typography).attrs({ variant: "caption-light" })`
  color: ${({ theme }) => theme.colors.grey[99]};
`;

const ContentInputBox = styled.View`
  width: 100%;
  height: 117px;
  background-color: #2f2f2f;
`;

const TagInputBox = styled.View`
  width: 100%;
  height: 19px;
  background-color: #2f2f2f;
`;
