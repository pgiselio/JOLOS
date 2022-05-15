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
    event.preventDefault();
    event.returnValue = "";
  };
  useEffect(() => {
    window.addEventListener("beforeunload", preventDataLost);
    return () => {
      window.removeEventListener("beforeunload", preventDataLost);
    };
  }, []);
  function onDismiss() {
    navigate(-1);
  }
  function attentionToX() {
    closeRef.current?.focus();
    setCloseClassNames("attention");
    setTimeout(() => setCloseClassNames(""), 1000);
  }

  return (
    <ModalRouterStyle aria-labelledby="label" initialFocusRef={buttonRef} onDismiss={attentionToX}>
      
      <Box className="box">
        <BoxTitle className="box-title">
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
