import "../styles/globals.css";
import "@fontsource/poppins";
import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";

const theme = {
  blue: "hsla(200, 94%, 53%, 1)",
  gray: "hsla(0, 0%, 96%, 1)",
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
