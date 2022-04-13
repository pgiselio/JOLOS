import { Navigate, useLocation } from "react-router-dom";
import { LoadingPageLogo } from "../../components/loadingPage/logo";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth = useAuth();
  const user = useUser();
  if (!auth.email && !auth.loadingUserFromLocalStorage) {
    return <Navigate to="/entrar?error=needsLogin" state={{from: location}} replace/>; 
  }
  if (auth.loadingUserFromLocalStorage || !user.id) {
    return (
      <LoadingPageLogo/>
    );
  }

  return children;
}
