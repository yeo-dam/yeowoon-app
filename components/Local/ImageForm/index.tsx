import React, { FC, useEffect } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, View } from "react-native";
import CreatePostViewModel from "~components/Screens/Create/Post/CreatePost.vm";
import { RootTabScreenProps } from "types";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import Interval from "~components/Shared/Interval";
import Image from "~components/Shared/Image";
import Typography from "~components/Shared/Typography";
import { observer } from "mobx-react";
import Carousel from "~components/Shared/Carousel";
import NoImageLogo from "~assets/images/No_image.svg";
import { useFormContext } from "react-hook-form";

type Props = {
  vm: CreatePostViewModel;
} & Pick<RootTabScreenProps<typeof CREATE_SCREEN_NAME.POST>, "navigation">;

const Component: FC<Props> = ({ vm, navigation }) => {
  const { reset, watch, setValue } = useFormContext();
  const imageIds = vm.uploadedImages.map((item) => item.id);

  console.log(`TCL ~ [index.tsx] ~ line ~ 23 ~ navigation`, navigation);

  useEffect(() => {
    setValue("images", imageIds);
  }, []);

  console.log(
    `TCL ~ [index.tsx] ~ line ~ 27 ~ watch("images")`,
    watch("images")
  );

  console.log(
    `TCL ~ [index.tsx] ~ line ~ 32 ~ vm.resetTrigger`,
    vm.resetTrigger
  );

  // useEffect(() => {
  //   reset();
  // }, []);

  const renderForm = () => {
    if (vm.uploadedImages.length === 0) {
      return (
        <ImageUploadWrapper>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(CREATE_SCREEN_NAME.UPLOAD)}
          >
            <ImageUploadSection>
              <NoImageLogo />
              <Interval height="10px" />
              <ImageUploadText>이미지를 넣어주세요!</ImageUploadText>
            </ImageUploadSection>
          </TouchableWithoutFeedback>
        </ImageUploadWrapper>
      );
    } else {
      return (
        <Carousel
          slideWidth={319}
          slideHeight={390}
          aspectRatio={319 / 390}
          pages={vm.uploadedImages}
          isTextImg={false}
        />
      );
    }
  };
  return <View>{renderForm()}</View>;
};

export default observer(Component);

const ImageUploadWrapper = styled.View``;

const ImageUploadSection = styled(View)`
  justify-content: center;
  align-items: center;
  width: 319px;
  height: 390px;
  background-color: ${({ theme }) => theme.colors.grey.ED};
`;

const ImageUploadText = styled(Typography)`
  color: #aaaaaa;
`;
