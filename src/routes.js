import { useRoutes, Navigate } from "react-router-dom";
import { RequiredAuth } from "./components/RequiredAuth";

import DashboardLayout from "./layouts/DashboardLayout";
import { PersistLogin } from "./components/PersistLogin/PersistLogin";
import { Home, User, Customer, Order, Login, Page401, Page404 } from "./pages";

const ROLES_LIST = {
  Receptionist: 1984,
  Admin: 1287,
};

export const Routes = () => {
  const routes = useRoutes([
    {
      element: <PersistLogin />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardLayout />,
          children: [
            {
              element: (
                <RequiredAuth
                  allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Receptionist]}
                />
              ),
              children: [
                { element: <Navigate to="/dashboard/home" />, index: true },
                {
                  path: "home",
                  element: <Home />,
                },
                {
                  path: "users",
                  element: <User />,
                },
                {
                  path: "customers",
                  element: <Customer />,
                },
                {
                  path: "orders",
                  element: <Order />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/unauthorized",
      element: <Page401 />,
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return routes;
};
