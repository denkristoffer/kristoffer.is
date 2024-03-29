import { forwardRef } from "react";
import { css } from "@emotion/react";
import { darken } from "polished";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  value?: string;
}

export default forwardRef<HTMLAnchorElement, ButtonProps>(function Button(
  { children, value, ...props },
  ref,
) {
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

        @media (prefers-color-scheme: dark) {
          background-color: ${theme.dark.components.button.primary.background};

          &:hover {
            background: ${darken(
              0.1,
              theme.dark.components.button.primary.background,
            )};
          }
        }
      `}
      ref={ref}
    >
      {value || children}
    </a>
  );
});
