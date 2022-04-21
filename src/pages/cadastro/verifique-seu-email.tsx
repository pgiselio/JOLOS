import { Link } from "react-router-dom";

export function VerifiqueOSeuEmailPage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          animation: "slide-left 0.5s ease",
        }}
      >
        <h1 style={{ fontSize: "100px", color: "var(--accent-color)" }}>
          <i className="fas fa-envelope"></i>
        </h1>
        <h1>Verifique o seu e-mail</h1>
        <span
          style={{
            maxWidth: 300,
            color: "var(--text-b)",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          Sua conta foi criada com êxito, verifique o seu e-mail para prosseguir
          com o cadastro
        </span>
      </div>
      <div className="bottom-actions">
        <div className=""></div>
        <div className="">
          <span style={{ fontSize: 14 }}>
            Já confirmou?
            <Link
              to="/entrar"
              className="btn-login"
              title="Já tem uma conta? Faça Login!"
            >
              Faça login
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}
