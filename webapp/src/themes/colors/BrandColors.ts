const tokens = {
  red: {
    light: {
      900: { value: "#3E0414" },
      800: { value: "#5B081F" },
      700: { value: "#95062E" },
      600: { value: "#C10A3D" },
      500: { value: "#ED1450" },
      400: { value: "#F04776" },
      300: { value: "#FF7DA0" },
      200: { value: "#FFB5C9" },
      100: { value: "#FFE3EB" }
    },
    dark: {
      900: { value: "#FFE3EB" },
      800: { value: "#FFB5C9" },
      700: { value: "#FF7DA0" },
      600: { value: "#F04776" },
      500: { value: "#ED1450" },
      400: { value: "#C10A3D" },
      300: { value: "#95062E" },
      200: { value: "#5B081F" },
      100: { value: "#3E0414" }
    }
  },
  yellow: {
    light: {
      900: { value: "#352B06" },
      800: { value: "#67530B" },
      700: { value: "#A28109" },
      600: { value: "#D2A80A" },
      500: { value: "#FECA0A" },
      400: { value: "#FAD13B" },
      300: { value: "#FDDE6E" },
      200: { value: "#FFEBA1" },
      100: { value: "#FDF3CF" }
    },
    dark: {
      900: { value: "#FDF3CF" },
      800: { value: "#FFEBA1" },
      700: { value: "#FDDE6E" },
      600: { value: "#FAD13B" },
      500: { value: "#FECA0A" },
      400: { value: "#D2A80A" },
      300: { value: "#A28109" },
      200: { value: "#67530B" },
      100: { value: "#352B06" }
    }
  },
  blue: {
    light: {
      900: { value: "#131431" },
      800: { value: "#1F204A" },
      700: { value: "#2F3173" },
      600: { value: "#3B3D9F" },
      500: { value: "#5257F6" },
      400: { value: "#6E72F7" },
      300: { value: "#9497F6" },
      200: { value: "#BABBF7" },
      100: { value: "#E3E4FB" }
    },
    dark: {
      900: { value: "#E3E4FB" },
      800: { value: "#BABBF7" },
      700: { value: "#9497F6" },
      600: { value: "#6E72F7" },
      500: { value: "#5257F6" },
      400: { value: "#3B3D9F" },
      300: { value: "#2F3173" },
      200: { value: "#1F204A" },
      100: { value: "#131431" }
    }
  },
  gray: {
    text: {
      light: {
        900: { value: "#2B2D3C" },
        800: { value: "#3C3E4D" },
        700: { value: "#4D4F5E" },
        600: { value: "#5E6070" },
        500: { value: "#5B5E75" },
        400: { value: "#6C6E85" },
        300: { value: "#9296B3" },
        200: { value: "#A8AAC2" },
        100: { value: "#C8CADB" }
      },
      dark: {
        900: { value: "#F0F1F8" },
        800: { value: "#E6E7F4" },
        700: { value: "#DCDDE7" },
        600: { value: "#D2D4DA" },
        500: { value: "#D2D4E1" },
        400: { value: "#C8CAD8" },
        300: { value: "#9296B3" },
        200: { value: "#7B7E94" },
        100: { value: "#5B5E75" }
      }
    },
    background: {
      light: {
        900: { value: "#E6E0E4" },
        800: { value: "#EDE4E8" },
        700: { value: "#F3E8EC" },
        600: { value: "#F9ECF0" },
        500: { value: "#F6EEF2" },
        400: { value: "#FAF2F5" },
        300: { value: "#FFFFFF" },
        200: { value: "#FFFFFF" },
        100: { value: "#FFFFFF" }
      },
      dark: {
        900: { value: "#312D30" },
        800: { value: "#2D2A2C" },
        700: { value: "#292729" },
        600: { value: "#252425" },
        500: { value: "#2A2729" },
        400: { value: "#221F20" },
        300: { value: "#1F1D1E" },
        200: { value: "#181616" },
        100: { value: "#0C0609" }
      }
    },
  },
  green: {
    light: {
      500: { value: "#009F69" },
    },
    dark: {
      500: { value: "#009F69" },
    }
  },
}

const semanticTokens = {
  primary: {
    DEFAULT: { value: { base: "{colors.red.light.500}", _dark: "{colors.red.dark.500}" } },
    100: { value: { base: "{colors.red.light.100}", _dark: "{colors.red.dark.900}" } },
    200: { value: { base: "{colors.red.light.200}", _dark: "{colors.red.dark.800}" } },
    300: { value: { base: "{colors.red.light.300}", _dark: "{colors.red.dark.700}" } },
    400: { value: { base: "{colors.red.light.400}", _dark: "{colors.red.dark.600}" } },
    500: { value: { base: "{colors.red.light.500}", _dark: "{colors.red.dark.500}" } },
    600: { value: { base: "{colors.red.light.600}", _dark: "{colors.red.dark.400}" } },
    700: { value: { base: "{colors.red.light.700}", _dark: "{colors.red.dark.300}" } },
    800: { value: { base: "{colors.red.light.800}", _dark: "{colors.red.dark.200}" } },
    900: { value: { base: "{colors.red.light.900}", _dark: "{colors.red.dark.100}" } },
  },
  secondary: {
    DEFAULT: { value: { base: "{colors.yellow.light.500}", _dark: "{colors.yellow.dark.500}" } },
    100: { value: { base: "{colors.yellow.light.100}", _dark: "{colors.yellow.dark.900}" } },
    200: { value: { base: "{colors.yellow.light.200}", _dark: "{colors.yellow.dark.800}" } },
    300: { value: { base: "{colors.yellow.light.300}", _dark: "{colors.yellow.dark.700}" } },
    400: { value: { base: "{colors.yellow.light.400}", _dark: "{colors.yellow.dark.600}" } },
    500: { value: { base: "{colors.yellow.light.500}", _dark: "{colors.yellow.dark.500}" } },
    600: { value: { base: "{colors.yellow.light.600}", _dark: "{colors.yellow.dark.400}" } },
    700: { value: { base: "{colors.yellow.light.700}", _dark: "{colors.yellow.dark.300}" } },
    800: { value: { base: "{colors.yellow.light.800}", _dark: "{colors.yellow.dark.200}" } },
    900: { value: { base: "{colors.yellow.light.900}", _dark: "{colors.yellow.dark.100}" } },
  },
  tertiary: {
    DEFAULT: { value: { base: "{colors.blue.light.500}", _dark: "{colors.blue.dark.500}" } },
    100: { value: { base: "{colors.blue.light.100}", _dark: "{colors.blue.dark.900}" } },
    200: { value: { base: "{colors.blue.light.200}", _dark: "{colors.blue.dark.800}" } },
    300: { value: { base: "{colors.blue.light.300}", _dark: "{colors.blue.dark.700}" } },
    400: { value: { base: "{colors.blue.light.400}", _dark: "{colors.blue.dark.600}" } },
    500: { value: { base: "{colors.blue.light.500}", _dark: "{colors.blue.dark.500}" } },
    600: { value: { base: "{colors.blue.light.600}", _dark: "{colors.blue.dark.400}" } },
    700: { value: { base: "{colors.blue.light.700}", _dark: "{colors.blue.dark.300}" } },
    800: { value: { base: "{colors.blue.light.800}", _dark: "{colors.blue.dark.200}" } },
    900: { value: { base: "{colors.blue.light.900}", _dark: "{colors.blue.dark.100}" } },
  },
  text: {
    DEFAULT: { value: { base: "{colors.gray.text.light.500}", _dark: "{colors.gray.text.dark.500}" } },
    100: { value: { base: "{colors.gray.text.light.100}", _dark: "{colors.gray.text.dark.900}" } },
    200: { value: { base: "{colors.gray.text.light.200}", _dark: "{colors.gray.text.dark.800}" } },
    300: { value: { base: "{colors.gray.text.light.300}", _dark: "{colors.gray.text.dark.700}" } },
    400: { value: { base: "{colors.gray.text.light.400}", _dark: "{colors.gray.text.dark.600}" } },
    500: { value: { base: "{colors.gray.text.light.500}", _dark: "{colors.gray.text.dark.500}" } },
    600: { value: { base: "{colors.gray.text.light.600}", _dark: "{colors.gray.text.dark.400}" } },
    700: { value: { base: "{colors.gray.text.light.700}", _dark: "{colors.gray.text.dark.300}" } },
    800: { value: { base: "{colors.gray.text.light.800}", _dark: "{colors.gray.text.dark.200}" } },
    900: { value: { base: "{colors.gray.text.light.900}", _dark: "{colors.gray.text.dark.100}" } },
  },
  bg: {
    DEFAULT: { value: { base: "{colors.gray.background.light.100}", _dark: "{colors.gray.background.dark.900}" } },
    100: { value: { base: "{colors.gray.background.light.100}", _dark: "{colors.gray.background.dark.100}" } },
    200: { value: { base: "{colors.gray.background.light.200}", _dark: "{colors.gray.background.dark.200}" } },
    300: { value: { base: "{colors.gray.background.light.300}", _dark: "{colors.gray.background.dark.300}" } },
    400: { value: { base: "{colors.gray.background.light.400}", _dark: "{colors.gray.background.dark.400}" } },
    500: { value: { base: "{colors.gray.background.light.500}", _dark: "{colors.gray.background.dark.500}" } },
    600: { value: { base: "{colors.gray.background.light.600}", _dark: "{colors.gray.background.dark.600}" } },
    700: { value: { base: "{colors.gray.background.light.700}", _dark: "{colors.gray.background.dark.700}" } },
    800: { value: { base: "{colors.gray.background.light.800}", _dark: "{colors.gray.background.dark.800}" } },
    900: { value: { base: "{colors.gray.background.light.900}", _dark: "{colors.gray.background.dark.900}" } },
  },
  success: { value: { base: "{colors.green.light.500}", _dark: "{colors.green.dark.500}" } },
  warning: { value: { base: "{colors.yellow.light.500}", _dark: "{colors.yellow.dark.500}" } },
  danger: { value: { base: "{colors.red.light.600}", _dark: "{colors.red.dark.600}" } },
  error: { value: { base: "{colors.red.light.700}", _dark: "{colors.red.dark.700}" } },
}

const BrandColors = {
  tokens,
  semanticTokens
};

export default BrandColors;

