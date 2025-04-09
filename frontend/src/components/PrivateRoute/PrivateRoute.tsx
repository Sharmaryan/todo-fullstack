import { Navigate } from "react-router";
import { TOKEN } from "../../utils/constants";
import { PrivateRouteProps } from "./PrivateRoute.types";

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const token = localStorage.getItem(TOKEN);
  
    return token ? <>{children}</> : <Navigate to="/signin" replace />;
  };
