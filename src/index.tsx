import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react'
import Men from './components/Men';
import Women from './components/Women';
import Kids from './components/Kids';
import HomeLiving from './components/HomeLiving';
import Beauty from './components/Beauty';
import Studio from "./components/Studio";
import Settings from "./components/Settings";
import HomeSection from "./components/HomeSection"
import ProtectRouter from './components/ProtectRouter'
import Login from './components/Login';
import ProductCategory from './components/ProductCategory';
import ProductCategoryWrapper from './components/ProductCategoryWrapper';
import WishListedItems from './components/WishListedItems';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
    <ProtectRouter>
    <App/>
    </ProtectRouter>
    ),
    children:[
      {
        path:"/",
        element:<HomeSection/>,
      },
      {
       path: "mens",
       element:<Men/>,
      },
      {
        path: "women",
        element:<Women/>,
       },
       {
        path: "Kids",
        element:<Kids/>,
       },
       {
        path: "home&Living",
        element:<HomeLiving/>,
       },
       {
        path: "beauty",
        element:<Beauty/>,
       },
       {
        path: "studio",
        element:<Studio/>,
       },
       {
        path: "/category/:name",
        element:<ProductCategoryWrapper/>,
       },
       {
        path:"/wishlist",
        element:<ProtectRouter>{<WishListedItems/>}</ProtectRouter>,
       }
     ],
  },
  {
    path: "settings",
    element:<Settings/>,
   },
  {
    path: "/login",
    element:<ProtectRouter>{<Login/>}</ProtectRouter>
  }
  // {
  //   path: "/login",
  //   element: <Login/>,
  // }
]); 

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
      domain="dev-x7d5hfyx7m21nidn.us.auth0.com"
      clientId='0KZhAN7tPP1VezMLXWPhbPzoIFbPzZXm'
      authorizationParams={{
        redirect_uri:window.location.origin,
      }}
      >
      {/* <App /> */}
      <RouterProvider router={router}/>
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
