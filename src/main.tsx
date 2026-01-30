import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./store.ts";
import { worker } from "./mocks/browser"; // 👈 import MSW

// Start MSW in dev mode
if (import.meta.env.MODE === "development") {
  worker.start();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
