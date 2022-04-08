import { Navigate, useLocation } from "react-router-dom";
import { LoadingPageLogo } from "../../components/loadingPage/logo";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth = useAuth();
  const user = useUser();
  if (!auth.email && !auth.loadingUserState) {
    return <Navigate to="/entrar?error=needsLogin" state={{from: location}} replace/>; 
  }
  if (auth.loadingUserState || user.loadingData) {
    return (
      <LoadingPageLogo/>
    );
  }

  return children;
}
