import App from "../App";
import HomePage from "./HomePage";
import ShopPage from "./ShopPage";
import ErrorPage from "./ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/shop", element: <ShopPage /> },
            { path: "*", element: <ErrorPage /> },
        ],
    },
];

export default routes;
