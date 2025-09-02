import { UseAppContext } from "@/context/UseAppContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user, loadingUserData } = UseAppContext();

  if (loadingUserData) return;

  if (!user) {
    return <Navigate to={"/sign-in"} replace />;
  }

  return <Outlet />;
};
