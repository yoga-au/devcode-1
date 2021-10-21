import "@fontsource/poppins";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/600.css";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import axios from "axios";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// type import
import type { AppProps } from "next/app";

// component import
import Navbar from "../components/Navbar";
import BodyContainer from "../components/BodyContainer";

const theme = {
  blue: "hsla(200, 94%, 53%, 1)",
  gray: "hsla(0, 0%, 96%, 1)",
  black: "hsla(0, 0%, 7%, 1)",
  darkGray: "hsla(0, 0%, 53%, 1)",
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

axios.defaults.baseURL = "https://todo.api.devcode.gethired.id";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Navbar />
        <BodyContainer>
          <Component {...pageProps} />
        </BodyContainer>
      </ThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
export default MyApp;
