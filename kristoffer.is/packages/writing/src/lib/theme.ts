type Color = string;

export type Theme = {
  colors: Record<"accent" | "background" | "color" | "metadata", Color>;
  dark: Record<"background" | "color", Color>;

  components: {
    button: {
      primary: Record<string, string>;
    };
  };

  fontFamilies: {
    monospace: string;
    sansSerif: string;
  };

  sizes: {
    maxWidth: string;
  };

  typography: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
  };
};

const colors = {
  accent: "#ff6c6c",
  color: "#282828",
  background: "#fff",
  metadata: "#636363",
};

const dark = {
  background: "#181a1c",
  color: "#d5d2cc",
  // color: #fdfdfd;
};

export const theme: Theme = {
  colors,
  dark,

  get components() {
    return {
      button: {
        primary: {
          background: colors.accent,
        },
      },
    };
  },

  fontFamilies: {
    monospace: 'SFMono-Regular, Menlo,Consolas, "Liberation Mono", monospace',
    sansSerif:
      'system-ui, -apple-system, "Segoe UI", Helvetica, Arial,sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },

  sizes: {
    maxWidth: "740px",
  },

  get typography() {
    return {
      fontFamily: theme.fontFamilies.sansSerif,
      fontSize: "18px",
      lineHeight: "1.8",
    };
  },
};
