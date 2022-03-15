import { ReactNode } from "react";
import { BoxContentStyle, BoxStyle, BoxTitleStyle } from "./styles";

type BoxType = {
    head?: React.ReactNode
    children: ReactNode
} 

export function Box({head, children}: BoxType) {
    return(
        <BoxStyle>
            {head && (
                <BoxTitleStyle>
                    {head}
                </BoxTitleStyle>
            )}
            
            {children}
        </BoxStyle>
    );
}

export function BoxContent({children}:{children?: React.ReactNode}) {
    return(
        <BoxContentStyle>
            {children}
        </BoxContentStyle>
    );
}