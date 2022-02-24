import { CSSProperties } from "react";
import { StyledButton } from "./style";
type ButtonType = {
    icon? : string
    type? : "button" | "submit" | "reset" | undefined
    style? : CSSProperties
    children?: React.ReactNode;
    className?: string
    id? : string
}
export function Button(Props : ButtonType){
    return(
        <StyledButton type={Props.type || "button"} {...(Props.style ? {style: Props.style} : {})} id={Props.id} className={Props.className}>
            {Props.children}   
        </StyledButton>
    );
}