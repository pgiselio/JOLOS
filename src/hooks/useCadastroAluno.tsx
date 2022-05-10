import { useContext } from "react";

import { CadastroContext } from "../contexts/CadastroContext";

export const useCadastroSteps = () => {
    const context = useContext(CadastroContext);
    
    return context;
}