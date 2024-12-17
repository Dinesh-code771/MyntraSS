import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Settings from "./Settings";
import Men from "./Components/Men";
import WoMen from "./Components/WoMen";
import Living from "./Components/Living";
import Kids from "./Components/Kids";
import ProductCategoryWraper from "./Components/ProductCategoryWraper";

import ProtectedRouter from "./Components/ProtectedRouter";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./Components/Login";
import HomeSection from "./Components/HomeSection";
import ProductCategory from "./Components/ProductCategory";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRouter>
        <App />
      </ProtectedRouter>
    ),
    children: [
      {
        path: "/",
        element: <HomeSection />,
      },
      {
        path: "/Men",
        element: <Men />,
      },
      {
        path: "/WoMen",
        element: <WoMen />,
      },
      {
        path: "/Kids",
        element: <Kids />,
      },
      {
        path: "/Living",
        element: <Living />,
      },
      {
        path: "/Category/:name",
        element: <ProductCategoryWraper />,
      },
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/login",
    element: <ProtectedRouter>{<Login />}</ProtectedRouter>,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-m7xzlawvicapt0f6.us.auth0.com"
        clientId="zRrA3fhIKsG09CJ0ep6UnjZBr3xFCRYo"
        authorizationParams={{ redirect_uri: window.location.origin }}
      >
        {/* <App /> */}
        <RouterProvider router={router} />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
