import React, { useState } from "react";
import { Switch } from "react-native";
import styled from "styled-components/native";

const Component = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Wrapper>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  align-items: "center";
  justify-content: "center";
`;

export default Component;
