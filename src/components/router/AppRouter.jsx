import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home.jsx";
import Cards from "../Cards/Cards";
import MainLayout from "../MainLayout/MainLayout";
import Cart from "../Cart/Cart.jsx";
import PrivateRoute from "../router/PrivateRoute.jsx";
import Admin from "../Admin/Admin.jsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "cards", element: <Cards /> },
  { path: "cart", element: <Cart /> },
  {
    path: "admin",
    element: <PrivateRoute element={<Admin />} requiredRole="admin" />,
  },
];

const renderRoutes = (routes) => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {renderRoutes(routes)}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
