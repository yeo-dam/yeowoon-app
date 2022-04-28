import React, { FC } from "react";
import styled, { css } from "styled-components/native";
import DropdownLogo from "~assets/Icons/dropdown.svg";

type Props = {
  hasMarginLeft?: boolean;
  hasMarginRight?: boolean;
};

const Component: FC<Props> = ({ hasMarginLeft, hasMarginRight }) => {
  return (
    <DropDownBox hasMarginLeft={hasMarginLeft} hasMarginRight={hasMarginRight}>
      <DropdownLogo />
    </DropDownBox>
  );
};

export default Component;

const DropDownBox = styled.View<{
  hasMarginLeft?: boolean;
  hasMarginRight?: boolean;
}>`
  ${({ hasMarginLeft }) =>
    hasMarginLeft &&
    css`
      margin-left: 12px;
    `}
  ${({ hasMarginRight }) =>
    hasMarginRight &&
    css`
      margin-right: 12px;
    `}
`;
