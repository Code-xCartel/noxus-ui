import { Route, Routes } from "react-router-dom";

import AuthLayout from "@/pages/authLayout.tsx";
import Home from "@/pages/home.tsx";
import ProtectedRoutes from "@/components/protectedRoutes.tsx";
import Header from "@/components/header.tsx";

import { routes } from "@/constants/routes.ts";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={routes.AUTH} element={<AuthLayout />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={routes.HOME} element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
