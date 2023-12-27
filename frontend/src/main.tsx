import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-Provider.tsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <></>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // Initializing Theme Provider from shadcn Library
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    {/* Initializing Redux */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);

// Extra Libraries uses

// shadcn for compnents
// tailwindcss for styling
// react-redux for state management
// @tanstack/react-table for table
// react-router-dom for routing
// @reduxjs/toolkit for state management
// axios for api call
