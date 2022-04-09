import React, { FC, useRef, useState } from "react";
import styled from "styled-components/native";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useFieldArray, useFormContext } from "react-hook-form";
import Input from "../Input";
import theme from "themes";
import { CREATE_SCREEN_NAME } from "constants/SCREEN_NAME";
import Button from "../Button";
import FlexBox from "../FlexBox";

type Props = {};

const Component: FC<Props> = () => {
  const { watch, setValue } = useFormContext();
  const watchedTags = watch("tags");

  console.log(`TCL ~ [index.tsx] ~ line ~ 17 ~ watchedTags`, watchedTags);
  // this will be attached with each input onChangeText
  const [textValue, setTextValue] = useState("");
  // our number of inputs, we can add the length or decrease
  const [numberInputs, setNumberInputs] = useState(0);
  // all our input fields are tracked with this array
  const refInputs = useRef<string[]>([...watchedTags]);

  // is to set the input fields value
  const setInputValue = (index: number, value: string) => {
    // we are storing input value to refInputs array to track them
    const inputs = refInputs.current;
    inputs[index] = value;
    // we are also setting the text value to the input field onChangeText
    setTextValue(value);
  };

  const handleSubmit = () => {
    addInput();
  };

  const handleKeyPress = (key: string) => {
    if (numberInputs !== 0 && key === "Backspace") {
      removeInput();
    }
  };

  // add a new input when the add input button is pressed
  const addInput = () => {
    // set value in the form
    setValue(`tags.${numberInputs}`, textValue);
    // add a new element in our refInputs array
    refInputs.current.push("");
    // set value for next
    setValue(`tags.${numberInputs + 1}`, "");
    // increase the number of inputs
    setNumberInputs((value) => value + 1);
  };

  const removeInput = () => {
    // remove from the array by index value
    refInputs.current.pop();
    // 삭제할 때, 폼에서도 제거해줘야 함
    setValue("tags", refInputs.current);
    // decrease the number of inputs
    setNumberInputs((value) => value - 1);
  };

  const renderInputs = () => {
    // FIXME : 화면전환 시, 인풋 값 날라감
    const inputs: JSX.Element[] = [];
    for (let idx = 0; idx < numberInputs + 1; idx++) {
      const currentInput = watch(`tags.${idx}`);
      inputs.push(
        <InputBox key={idx} isEmpty={numberInputs === 0}>
          <Input
            name={`tags.${idx}`}
            fontSize="14px"
            width={currentInput ? "100%" : "200px"}
            height="14px"
            color={theme.colors.background.paper}
            inputAccessoryViewID={CREATE_SCREEN_NAME.POST}
            onKeyPress={({ nativeEvent: { key } }) => handleKeyPress(key)}
            value={watch(`tags.${idx}`)}
            onChangeText={(value) => setInputValue(idx, value)}
            onSubmitEditing={handleSubmit}
            placeholder="placeholder"
          />
        </InputBox>
      );
    }

    return inputs;
  };

  return <StyledFlexBox>{renderInputs()}</StyledFlexBox>;
};

export default Component;

const StyledFlexBox = styled(FlexBox)`
  height: 100%;
`;

const InputBox = styled(FlexBox)<{ isEmpty?: boolean }>`
  /* flex: 1; */
  margin-right: 4px;
  /* border: 1px solid green; */
`;
