import { CircularProgress } from "react-cssfx-loading/lib";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/useAuth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  if (auth.lodingUserState) {
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
    return <Navigate to="/entrar?error=needsLogin" />;
  }
  return children;
}
