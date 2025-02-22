import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    heading: "SF Pro Display, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    mono: "SF Mono, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  },
});

export default theme;
