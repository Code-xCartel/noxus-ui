import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks.ts";

import { validateSession } from "@/utils/session.ts";

const ProtectedRoutes = () => {
  const [autoLoginCheck, setAutoLoginCheck] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    validateSession(dispatch).then(() => setAutoLoginCheck(true));
  }, [dispatch]);

  useEffect(() => {
    if (autoLoginCheck && !isAuthenticated && location.pathname !== "/auth") {
      navigate("/auth", { replace: true, state: { from: location } });
    }
  }, [navigate, isAuthenticated, autoLoginCheck, location]);

  return isAuthenticated ? <Outlet /> : null;
};

export default ProtectedRoutes;
