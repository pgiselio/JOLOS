import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import CircularProgressFluent from "../../components/circular-progress-fluent";
import { useAuth } from "../../hooks/useAuth";
import { StyledAccess } from "../../styles/LoginSignupStyle";

export default function LogoutPage() {
  const auth = useAuth();
  useEffect(() => {
    auth.logout();
  });
  if (!auth.email) {
    return <Navigate to="/entrar" replace />;
  }
  return (
    <StyledAccess>
      <div
        className="access-container"
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          color: "#413e4a",
        }}
      >
        <CircularProgressFluent
          color="var(--accent-color)"
          height="60px"
          width="60px"
          duration="1.5s"
        />
        <h2>Saindo...</h2>
      </div>
    </StyledAccess>
  );
}
