import styled from "@emotion/styled";

import Aside from "./aside";
import { Text } from "./text";

import React from "react";

const StyledAside = styled(Aside)`
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: ${({ theme }) => theme.components.note.primary.background};
  color: ${({ theme }) => theme.colors.color};

  @media (prefers-color-scheme: dark) {
    background: #3b361e;
    color: #fff;
  }
`;

const Title = styled(Text)`
  font-weight: 600;
`;

interface NoteProps {
  children: React.ReactNode;
  title?: string;
}

export default function Note({ children, title }: NoteProps) {
  return (
    <StyledAside>
      {title ? <Title>{title}</Title> : null}

      {typeof children === "string" ? <Text>{children}</Text> : children}
    </StyledAside>
  );
}
