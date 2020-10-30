import { css } from "@emotion/react";
import { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref,
) {
  return (
    <input
      {...props}
      css={(theme) => css`
        appearance: none;
        border: 1px solid ${theme.components.input.primary.border};
        border-radius: 0;
        background: transparent;
        color: ${theme.components.input.primary.color};
        display: block;
        font-size: px;
        padding: 4px 8px;
      `}
      ref={ref}
    />
  );
});
