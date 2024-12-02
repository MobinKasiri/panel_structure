import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Layout from "../pages/layout/Layout";

// type RouteProps = RouteObject & { isProtected?: boolean };

const sourceRoute: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

// const convertedRoutes: RouteObject[] = sourceRoute.map((item) => {
//   if (item.isProtected)
//     return {
//       ...item,
//       element: <Layout>{item.element}</Layout>,
//     };
//   else return item;
// });

const routes = createBrowserRouter(sourceRoute);

export default routes;
