/// <reference types="@emotion/react/types/css-prop" />

import "@emotion/react";

import type { Theme as CustomTheme } from "../lib/theme";

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}
