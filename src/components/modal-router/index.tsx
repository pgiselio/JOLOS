// import { ModalRouterStyle } from "./style";
import { Dialog } from "@reach/dialog";
import "./styles.css";
import { ReactNode, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, BoxContent, BoxTitle } from "../box";
import { Button } from "../button";

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
  function onDismiss() {
    navigate(-1);
  }
  return (
    <Dialog aria-labelledby="label" initialFocusRef={buttonRef}>
      <Box style={{maxHeight: "100vh", margin: 0}}>
        <BoxTitle style={{ display: "flex", justifyContent: "space-between"}}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 12px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onDismiss}
            >
              <i
                className="fas fa-times"
                style={{ fontSize: "15px", color: "var(--text-a)" }}
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
        >{children}</BoxContent>
      </Box>
    </Dialog>
  );
}
