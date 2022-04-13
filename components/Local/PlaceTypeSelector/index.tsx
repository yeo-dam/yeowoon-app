import React, { FC, useState } from "react";
import styled from "styled-components/native";
import { View, Pressable } from "react-native";
import { get, useFormContext } from "react-hook-form";
import Typography from "~components/Shared/Typography";
import Interval from "~components/Shared/Interval";
import DropDownContainer from "~components/Shared/DropDownContainer";
import Divider from "~components/Shared/Divider";
import PlaceType from "~domain/enum/PlaceType";
import Flex from "~components/Shared/FlexBox";
import { renderErrMsg } from "helper/Formatter/ErrorMessage";

type Props = {};

const Component: FC<Props> = () => {
  const { watch, setValue, formState } = useFormContext();
  const INPUT_NAME = "place.type";

  const error = get(formState.errors, INPUT_NAME);
  const watchedType = watch(INPUT_NAME);
  const [modalVisible, setModalVisible] = useState(false);
  const onSelect = (data: PlaceType) => {
    setValue(INPUT_NAME, data);
    setModalVisible(false);
  };
  return (
    <DropDownContainer
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      content={
        <View>
          <TitleBox>
            <Typography variant="subhead-regular">
              장소종류를 선택하세요
            </Typography>
          </TitleBox>
          <Divider orientation="Horizontal" />
          <Interval height="45px" />
          <PlaceTypeBox>
            <LeftSection>
              <Pressable onPress={() => onSelect(PlaceType.FOOD)}>
                <DropDownTypo>음식점</DropDownTypo>
              </Pressable>
            </LeftSection>
            <Divider orientation="Vertical" />
            <RightSection>
              <Pressable onPress={() => onSelect(PlaceType.HOTEL)}>
                <DropDownTypo>숙소</DropDownTypo>
              </Pressable>
            </RightSection>
          </PlaceTypeBox>
          <Interval height="31px" />
          <PlaceTypeBox>
            <LeftSection>
              <Pressable onPress={() => onSelect(PlaceType.CAFE)}>
                <DropDownTypo>카페</DropDownTypo>
              </Pressable>
            </LeftSection>
            <Divider orientation="Vertical" />
            <RightSection>
              <Pressable onPress={() => onSelect(PlaceType.PUB)}>
                <DropDownTypo>바&펍</DropDownTypo>
              </Pressable>
            </RightSection>
          </PlaceTypeBox>
          <Interval height="31px" />
          <PlaceTypeBox>
            <LeftSection>
              <Pressable onPress={() => onSelect(PlaceType.CONVINIENCE)}>
                <DropDownTypo>편의시설</DropDownTypo>
              </Pressable>
            </LeftSection>
            <Divider orientation="Vertical" />
            <RightSection>
              <Pressable onPress={() => onSelect(PlaceType.NATURE)}>
                <DropDownTypo>자연</DropDownTypo>
              </Pressable>
            </RightSection>
          </PlaceTypeBox>
          <Interval height="31px" />
          <PlaceTypeBox>
            <LeftSection>
              <Pressable onPress={() => onSelect(PlaceType.SHOP)}>
                <DropDownTypo>쇼핑</DropDownTypo>
              </Pressable>
            </LeftSection>
            <Divider orientation="Vertical" />
            <RightSection>
              <Pressable onPress={() => onSelect(PlaceType.TOUR)}>
                <DropDownTypo>관광</DropDownTypo>
              </Pressable>
            </RightSection>
          </PlaceTypeBox>
          <Interval height="31px" />
        </View>
      }
    >
      <Typo>{watchedType ? watchedType : "장소"}</Typo>
      {error && <ErrMsg>{renderErrMsg(error)}</ErrMsg>}
    </DropDownContainer>
  );
};

export default Component;

const Typo = styled(Typography).attrs({ variant: "caption-light" })`
  color: ${({ theme }) => theme.colors.grey.AA};
`;

const TitleBox = styled(Flex)`
  justify-content: center;
  width: 100%;
  padding: 0px 0px 16px 0px;
`;

const DropDownTypo = styled(Typography).attrs({ variant: "subhead-medium" })``;

const PlaceTypeBox = styled(Flex)``;

const LeftSection = styled(Flex)`
  justify-content: center;
  width: 48%;
`;

const RightSection = styled(Flex)`
  justify-content: center;
  width: 48%;
`;

const ErrMsg = styled(Typography)`
  color: red;
`;
