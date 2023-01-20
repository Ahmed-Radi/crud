import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './i18n/config'

import './style/index.scss';

import App from './App';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import NotFound from './Pages/NotFound/NotFound';

// Create a client
const queryClient = new QueryClient()

// React router dom
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound /> ,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "register",
                element: <Register />,
            },
            // if I want to add navbar into 404 page can add it here with path "*"
            // { path: "*", element: <NotFound />,}
        ]
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
