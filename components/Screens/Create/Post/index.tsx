import * as React from "react";
import Image from "components/Shared/Image";
import { observer } from "mobx-react";
import Typography from "components/Shared/Typography";
import styled from "styled-components/native";
import { RootTabScreenProps } from "types";
import { View } from "react-native";
import Input from "~components/Shared/Input";
import CreatePostDto from "~domain/dto/CreatePostDto";
import CreatePostViewModel from "./CreatePost.vm";
import Flex from "~components/Shared/FlexBox";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import DescriptionForm from "~components/Local/DescriptionForm";
import ImageForm from "~components/Local/ImageForm";
import { windowWidth } from "constants/Layout";
import { getRootViewModel } from "~components/Screens/VmManager";
import { FormProvider, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { runInAction } from "mobx";
import KeyboardAvoiding from "~components/Layout/KeyboardLayout";

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
          </Wrapper>
        </FormWrapper>
      </FormProvider>
    </KeyboardAvoiding>
  );
};

export default observer(CreatePost);

const Wrapper = styled.View`
  margin-top: 19px;
  width: ${windowWidth * 0.936 + "px"};
  height: ${windowWidth * 0.936 * 1.4986 + "px"};
  background-color: white;
`;

const InnerWrapper = styled.View`
  position: relative;
  flex: 1;
  padding-top: 32px;
  align-items: center;
`;

const FormWrapper = styled(Flex)`
  flex: 1;
`;

const DateInput = styled(Input)``;

const DateFlexBox = styled(Flex)`
  position: absolute;
  right: 30px;
  bottom: 14px;
`;

const DescriptionBox = styled(View)`
  justify-content: center;
  width: ${windowWidth * 0.85 + "px"};
  height: ${windowWidth * 0.85 * 1.2225 + "px"};
  background-color: ${({ theme }) => theme.colors.grey.black};
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
