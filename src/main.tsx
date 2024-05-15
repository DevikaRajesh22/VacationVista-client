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
        <GoogleOAuthProvider clientId={process.env.GOOGLE_AUTHENTICATION as string}>
          <App />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
