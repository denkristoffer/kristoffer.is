/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import Aside from "./aside";
import { Text } from "./text";

import React from "react";

interface NoteProps {
  children: React.ReactNode;
}

export default function Note({ children }: NoteProps): React.ReactElement {
  return (
    <Aside
      css={(theme) => css`
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        background: ${theme.colors.warning};
        color: #fff;

        @media (prefers-color-scheme: dark) {
          background: ${theme.dark.warning};
        }
      `}
    >
      <Text>{children}</Text>
    </Aside>
  );
}
