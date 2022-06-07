import { useContext } from "react";
import { AppOptionsContext } from "../contexts/AppOptionsContext";


export const useAppOptions = () => {
    const context = useContext(AppOptionsContext);
    
    return context;
}