import { Children, CSSProperties } from "react";
import { StyledButton } from "./style";
type ButtonType = {
    text? : string
    icon? : string
    type? : "button" | "submit" | "reset" | undefined
    style? : CSSProperties
    children?: React.ReactNode;
}
export function Button(Props : ButtonType){
    let content : any;
    if(Props.children){
        content = Props.children;
    }else{
        content = (Props.icon && <i className={Props.icon}></i>);
        content += Props.text;
    }
    return(
        <StyledButton type={Props.type || "button"} {...(Props.style ? {style: Props.style} : {})}>
            {content}   
        </StyledButton>
    );
}