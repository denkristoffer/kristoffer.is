/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { Text } from "./text";

interface NoteProps {
  children: React.ReactNode;
}

export default function Note({ children }: NoteProps): React.ReactElement {
  return (
    <aside
      css={(theme) => css`
        background: #f3bb41;
        border-radius: 3px;
        margin: 0 auto 50px;
        max-width: ${theme.sizes.maxWidth};
        padding: 20px 0;
      `}
    >
      <Text>{children}</Text>
    </aside>
  );
}
