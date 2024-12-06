import React from "react";
import ReactDOM from "react-dom/client";
import "./variable.module.scss";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Introduce from "./pages/introduce";
import Dashboard from "./pages/dashboard";
import DetailCrime from "./pages/detailCrime";

// Create a QueryClient instance
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createHashRouter([
    {
        path: "/",
        element: <Introduce />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/detailCrime",
        element: <DetailCrime />,
    },
]);

root.render(
    <React.StrictMode>
        {/* Wrap your app with QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
