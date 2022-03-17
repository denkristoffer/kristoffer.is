import React, { useCallback, useState, useMemo } from "react";
import { useRifm } from "rifm";

import Input from "./input";
import type { InputProps } from "./input";

const numberAccept = /\d+/g;

export const isNumber = (value: unknown): value is number => {
  return Number.isFinite(value) && !Number.isNaN(value);
};

export const parseNumber = (string: string): string =>
  (string.match(numberAccept) || []).join("");

export const formatNumberToCurrencyWithFormatter = (
  formatter: Intl.NumberFormat,
  number: number,
): string => {
  return formatter.format(number);
};

/**
 * @note The `onChange` handler is different from a regular `HTMLInputElement`
 * `onChange` in that it doesn't pass an event but only the changed value.
 */
interface CurrencyInputProps extends Omit<InputProps, "onChange"> {
  // max?: number;
  maxLength?: number;
  // min?: number;
  numberFormat: Intl.NumberFormat;
  onChange?: (value: string) => void;
  prefix?: string;
  suffix?: string;
}

export default function CurrencyInput({
  // max = Number.MAX_SAFE_INTEGER, @todo
  maxLength: givenMaxLength,
  // min = 0, @todo
  numberFormat,
  onChange: onChangeCallback,
  prefix = "",
  suffix = "",
  ...props
}: CurrencyInputProps): React.ReactElement {
  const format = useCallback(
    (value: string) => {
      if (value !== "") {
        const parsed = parseNumber(value);
        const number = Number.parseFloat(parsed);

        if (isNumber(number)) {
          return `${prefix}${formatNumberToCurrencyWithFormatter(
            numberFormat,
            number,
          )}${suffix}`;
        }
      }

      return "";
    },
    [numberFormat, prefix, suffix],
  );

  const maxLength = useMemo<number>(() => {
    const string = "1".repeat(givenMaxLength);
    const formatted = format(string);

    const maxLength = givenMaxLength + formatted.length - string.length;
    return maxLength;
  }, [format, givenMaxLength]);

  const [value, setValue] = useState<string>("");
  const rifm = useRifm({
    format,
    value,
    onChange: (value) => {
      const digits: string = parseNumber(value);
      setValue(digits);
      onChangeCallback(digits);
    },
  });

  return (
    <Input
      {...props}
      inputMode="numeric"
      maxLength={givenMaxLength ? maxLength : undefined}
      // pattern="[0-9]*"
      // type="number"
      onChange={rifm.onChange}
      value={rifm.value}
    />
  );
}
