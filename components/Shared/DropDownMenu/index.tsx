import React, { FC } from "react";
import styled from "styled-components/native";
import DropdownLogo from "~assets/Icons/dropdown.svg";

type Props = {};

const Component: FC<Props> = () => {
  return (
    <DropDownBox>
      <DropdownLogo />
    </DropDownBox>
  );
};

export default Component;

const DropDownBox = styled.View`
  margin-left: 12px;
`;
