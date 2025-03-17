import { Route, Routes } from "react-router-dom";

import AuthLayout from "@/pages/authLayout.tsx";
import Home from "@/pages/home.tsx";
import ProtectedRoutes from "@/components/protectedRoutes.tsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AuthLayout />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
