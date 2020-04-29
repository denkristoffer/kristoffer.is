type Color = string;

export type Theme = {
  colors: Record<string, Color>;

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
  code: "#ddd",
  color: "#080808",
  background: "#fff",
  metadata: "#636363",
};

// const darkColors = {
//   ...colors,
//   background: "#181a1c",
//   color: "#fdfdfd",
// };

export const theme: Theme = {
  colors,

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
