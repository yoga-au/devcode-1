import "@fontsource/poppins";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/600.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";

// type import
import type { AppProps } from "next/app";

// component import
import Navbar from "../components/Navbar";
import BodyContainer from "../components/BodyContainer";

const theme = {
  blue: "hsla(200, 94%, 53%, 1)",
  gray: "hsla(0, 0%, 96%, 1)",
};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    font-family: "Poppins", sans-serif;
    background-color: hsla(0, 0%, 96%, 1);
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <BodyContainer>
        <Component {...pageProps} />
      </BodyContainer>
    </ThemeProvider>
  );
}
export default MyApp;
