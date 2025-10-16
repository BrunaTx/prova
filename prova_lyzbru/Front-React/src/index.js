import React from 'react';
import ReactDOM from 'react-dom/client';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Router
import router from './routes';
import { RouterProvider } from "react-router-dom";
import UserProvider from "./contexts/UserProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);


// npm install react-loading-indicators