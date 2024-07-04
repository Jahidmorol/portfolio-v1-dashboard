import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Router";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Toaster richColors position="top-center" />
    <RouterProvider router={router} />
  </Provider>
);
