import { useState, createContext } from "react";
import { CadastroContextType } from "./types";

export const CadastroContext = createContext<CadastroContextType>({} as CadastroContextType);

export function CadastroProvider({ children }: {children: JSX.Element}) {
  const [verificationCode, setVerificationCode] = useState<string | undefined>("");
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");

  return (
    <CadastroContext.Provider
      value={{
        step,
        setStep,
        verificationCode,
        setVerificationCode,
        email,
        setEmail,
        token,
        setToken
      }}
    >
      {children}
    </CadastroContext.Provider>
  );
}
