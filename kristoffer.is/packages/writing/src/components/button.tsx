/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { darken } from "polished";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  value?: string;
}

export default function Button({
  children,
  value,
  ...props
}: ButtonProps): React.ReactElement {
  return (
    <a
      {...props}
      css={(theme) => css`
        appearance: none;
        background: ${theme.components.button.primary.background};
        border: 0;
        border-radius: 3px;
        color: ${theme.colors.background};
        cursor: pointer;
        display: inline-block;
        font-family: ${theme.typography.fontFamily};
        font-size: ${theme.typography.fontSize};
        padding: 16px 24px;
        position: relative;
        user-select: none;
        text-decoration: none;
        transition: background 150ms ease-in-out;

        &:hover {
          background: ${darken(
            0.1,
            theme.components.button.primary.background,
          )};
        }

        &:active {
          top: 1px;
        }
      `}
    >
      {value || children}
    </a>
  );
}
