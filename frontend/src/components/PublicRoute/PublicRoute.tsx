import { Navigate } from "react-router";
import { TOKEN } from "../../utils/constants";
import { PublicRouteProps } from "./PublicRoute.types";

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem(TOKEN);

  return token ? <Navigate to="/" replace /> : <>{children}</>;
};
