import "./styles.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../box";
import { Button } from "../button";
import { ModalRouterStyle } from "./style";

export function ModalRouter({
  title,
  children,
  toForm,
}: {
  title: string;
  children: ReactNode;
  toForm?: string;
}) {
  let navigate = useNavigate();
  let buttonRef = useRef<HTMLButtonElement>(null);
  let closeRef = useRef<HTMLButtonElement>(null);
  const [closeClassNames, setCloseClassNames] = useState("");
  const preventDataLost = (event: any) => {
    // Cancel the event as stated by the standard.
    event.preventDefault();

    //Para customizar o texto, e é necessário para funcionar no Safari e Chrome, IE e Firefox anterior a versão 4
    event.returnValue = "";
  };
  useEffect(() => {
    window.addEventListener("beforeunload", preventDataLost);
  }, []);
  function onDismiss() {
    window.removeEventListener("beforeunload", preventDataLost);
    navigate(-1);
  }
  function attentionToX() {
    closeRef.current?.focus();
    setCloseClassNames("fa-shake")
    setTimeout(() => setCloseClassNames(""), 500);
  }

  return (
    <ModalRouterStyle aria-labelledby="label" initialFocusRef={buttonRef} onDismiss={attentionToX}>
      
      <Box style={{ maxHeight: "100vh", margin: 0, paddingBottom: 30}}>
        <BoxTitle style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              aria-label="Close"
              className="close-button"
              ref={closeRef}
              onClick={onDismiss}
            >
              <i
                className={`fas fa-times ${closeClassNames}`}
              ></i>
            </button>
            <h2>{title}</h2>
          </div>
          {toForm && (
            <div>
              <Button
                type="submit"
                style={{ padding: "6px 16px" }}
                form={toForm}
                ref={buttonRef}
              >
                Criar
              </Button>
            </div>
          )}
        </BoxTitle>

        <BoxContent
          style={{
            height: "100%",
            overflow: "auto",
          }}
        >
          {children}
        </BoxContent>
      </Box>
    </ModalRouterStyle>
  );
}
