import { defineConfig } from "@pandacss/dev";
import { Theme } from "./src/themes";

export default defineConfig({
  theme: {
    tokens: {
      colors: Theme.colors.tokens,
      fontSizes: Theme.fonts.tokens.fontSizes,
      lineHeights: Theme.fonts.tokens.lineHeights,
      letterSpacings: Theme.fonts.tokens.letterSpacings,
      spacing: Theme.spacings,
      sizes: Theme.sizes,
      radii: Theme.radii,
      shadows: Theme.shadows
    },
    semanticTokens: {
      colors: Theme.colors.semanticTokens,
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      fadeOut: {
        '0%': { opacity: '1' },
        '100%': { opacity: '0' }
      }
    }
  },

  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: "styled-system",

  // Extracts CSS from JSX
  jsxFramework: 'react',
});
