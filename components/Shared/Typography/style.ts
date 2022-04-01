import { FlattenInterpolation } from "styled-components";
import { css, ThemeProps } from "styled-components/native";

import { Variant } from "./types";

export const variantStyles: {
  [key in Variant]: FlattenInterpolation<ThemeProps<any>>;
} = {
  ["headline-bold"]: css`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
  `,
  ["headline-light"]: css`
    font-style: normal;
    font-weight: 300;
    font-size: 24px;
  `,
  ["subhead-medium"]: css`
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
  `,
  ["subhead-medium-small"]: css`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
  `,
  ["subhead-regular"]: css`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
  `,
  ["body-bold"]: css`
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
  `,
  ["body-regular"]: css`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  `,
  ["body-medium"]: css`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  `,
  ["caption-regular"]: css`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  `,
  ["caption-light"]: css`
    font-style: normal;
    font-weight: 300;
    font-size: 12px;
  `,
  ["caption-medium"]: css`
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
  `,
  digit: css`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  `,
  ["english-regular"]: css`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  `,
  ["english-regular-small"]: css`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  `,
  ["button"]: css`
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
  `,
};
