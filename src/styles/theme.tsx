import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: "#282828",
        _dark: "#FFF",
      },
      altText: {
        default: "#565857",
        _dark: "#AAA",
      },
      primary: {
        default: "#FFF",
        _dark: "#282828",
      },
      secondary: {
        default: "#f0f0f0",
        _dark: "rgba(255,255,255,0.1)",
      },
      borderColor: {
        default: "rgba(0,0,0,0.1)",
        _dark: "rgba(255,255,255,0.1)",
      },
    },
  },
  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  },
  styles: {
    global: {
      "html, body": {
        color: "text",
        bg: "primary",
        fontWeight: 500,
        scrollBehavior: "smooth",
      },
      "@keyframes fade-in": {
        from: {
          opacity: 0,
          transform: "translateY(50%)",
        },
        to: {
          opacity: 1,
          transform: "initial",
        },
      },
    },
  },
})
