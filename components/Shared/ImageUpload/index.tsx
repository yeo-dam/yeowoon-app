import React, { useState, PropsWithChildren } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import styled from "styled-components/native";

type Props<T extends FieldValues> = {
  name: Path<T>;
};

const Component = <T extends FieldValues>({
  name,
  children,
}: PropsWithChildren<Props<T>>) => {
  const methods = useFormContext<T>();
  const [imageSource, setImageSource] = useState<string>("");

  const pickImage = async (onChange: (id: string) => void) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 3,
    });

    console.log(result);

    if (!result.cancelled) {
      onChange(result.uri);
      setImageSource(result.uri);
    }
  };

  return (
    <Controller<T>
      name={name}
      control={methods.control}
      render={({ field: { onChange } }) => {
        return (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {imageSource ? (
              <TouchableOpacity onPress={() => pickImage(onChange)}>
                <Image
                  source={{ uri: imageSource }}
                  style={{ width: 319, height: 390 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => pickImage(onChange)}>
                {children}
              </TouchableOpacity>
            )}
          </View>
        );
      }}
    ></Controller>
  );
};

export default Component;

const ImageUploadWrapepr = styled.View``;
