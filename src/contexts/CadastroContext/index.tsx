import { useEffect, useState, createContext } from "react";
import { CadastroContextType } from "./types";

export const CadastroContext = createContext<CadastroContextType>({} as CadastroContextType);

export function CadastroProvider({ children }: {children: JSX.Element}) {
  const [loadingUserFromLocalStorage, setLoadingUserFromLocalStorage] =
    useState(true);
  const [verificationCode, setVerificationCode] = useState<string | undefined>("");
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setLoadingUserFromLocalStorage(false);
  }, []);
  return (
    <CadastroContext.Provider
      value={{
        step,
        setStep,
        verificationCode,
        setVerificationCode,
        email,
        setEmail,
      }}
    >
      {children}
    </CadastroContext.Provider>
  );
}
