import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter } from "react-router";
import { FirebaseAppProvider } from "reactfire";
import FirebaseServices from "./config/firebase-services.tsx";
import { firebaseConfig } from "./config/firebase.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseServices>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FirebaseServices>
    </FirebaseAppProvider>
  </StrictMode>
);
