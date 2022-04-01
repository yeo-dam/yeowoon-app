/**
 * @copyright Copyright © 2018-2021 Corretto, Inc. All rights reserved.
 */

import React, { FC } from "react";
import styled from "styled-components/native";

type Props = {
  height?: string;
  width?: string;
};

const Component: FC<Props> = ({ height, width }) => {
  const renderComponent = () => {
    if (width) {
      return <HorizontalInterval width={width} />;
    } else {
      return <VerticalInterval height={height} />;
    }
  };

  return <Wrapper>{renderComponent()}</Wrapper>;
};

export default Component;

const Wrapper = styled.View``;

const VerticalInterval = styled.View<Props>`
  height: ${({ height }) => (height ? height : "100%")};
`;

const HorizontalInterval = styled.View<Props>`
  width: ${({ width }) => (width ? width : "100%")};
`;
