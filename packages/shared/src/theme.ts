import { Color } from "./types";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type Theme = {};

const colors: Record<string, Color> = {
  accent: "#ff6c6c",
};

export const theme: Theme = {
  colors,
};
