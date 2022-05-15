import { Navigate, useLocation } from "react-router-dom";
import { LoadingPageLogo } from "../../components/loadingPage/logo";
import { useAuth } from "../../hooks/useAuth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth = useAuth();
  if (!auth.email && !auth.loadingUserFromLocalStorage) {
    return <Navigate to="/entrar?error=needsLogin" state={{from: location}} replace/>; 
  }
  if (auth.loadingUserFromLocalStorage || !auth.userInfo?.id || !auth.authorities?.length) {
    return (
      <LoadingPageLogo/>
    );
  }

  return children;
}
