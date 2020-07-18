/** @jsx jsx */
import { css, jsx } from "@emotion/react";

interface AsideProps {
  children: React.ReactNode;
}

export default function Aside({
  children,
  ...props
}: AsideProps): React.ReactElement {
  return (
    <aside
      {...props}
      css={(theme) => css`
        background: #f4f4f4;
        border-radius: 3px;
        margin: 0 auto 50px;
        max-width: ${theme.sizes.maxWidth};
        padding: 20px 0;

        @media (prefers-color-scheme: dark) {
          background: #2f2f2f;
        }

        p + & {
          margin-top: 50px;
        }
      `}
    >
      {children}
    </aside>
  );
}