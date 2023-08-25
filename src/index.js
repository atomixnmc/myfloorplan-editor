import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import store from "./redux/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>MyFloorplan Editor</title>
      <link rel="canonical" href="http://myfloor.com/example" />
    </Helmet>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
