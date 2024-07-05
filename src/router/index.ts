import { lazy } from "react";

const Crm = lazy(() => import("../pages/crm"))
const Invoice = lazy(() => import('../pages/invoice'))

export const router: App.AppRoute[] =
  [
    {
      path: "/crm",
      element: Crm,
      isAuth: true,
    },
    {
      path: "/invoice",
      element: Invoice,
      isAuth: true,
    },
  ]
