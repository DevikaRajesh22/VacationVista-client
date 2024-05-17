import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import store from "./Store/store.ts";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider>
        <GoogleOAuthProvider clientId='902263991391-of2l5sfdhrcp84g2bs9ldu0ho11rg51c.apps.googleusercontent.com'>
          <App />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
