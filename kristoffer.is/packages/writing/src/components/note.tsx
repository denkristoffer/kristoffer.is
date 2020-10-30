import styled from "@emotion/styled";

import Aside from "./aside";
import { Text } from "./text";

import React from "react";

const StyledAside = styled(Aside)`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: ${({ theme }) => theme.colors.warning};
  color: #fff;

  @media (prefers-color-scheme: dark) {
    background: ${({ theme }) => theme.dark.warning};
  }
`;

interface NoteProps {
  children: React.ReactNode;
}

export default function Note({ children }: NoteProps): React.ReactElement {
  return (
    <StyledAside>
      <Text>{children}</Text>
    </StyledAside>
  );
}
