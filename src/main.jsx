import React from "react";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
// import theme from "./utils/theme";
// ---------------------

import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

// document.title = "Your App Title";
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider 
      // theme={theme}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// makeServer();
