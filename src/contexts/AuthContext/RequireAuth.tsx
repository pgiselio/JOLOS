import { CircularProgress } from "react-cssfx-loading/lib";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const auth = useAuth();
  if (auth.loadingUserState) {
    return (
      <div style={{display: "flex", height: "100vh", alignItems: "center", justifyContent: "center"}}>
        <CircularProgress
          color="var(--accent-color)"
          height="70px"
          width="70px"
          duration="1.5s"
        />
      </div>
    );
  }
  if (!auth.email) {
    return <Navigate to="/entrar?error=needsLogin" state={{from: location}} replace/>;
  }
  return children;
}
