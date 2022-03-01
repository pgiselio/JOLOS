import { type } from "os";
import React from "react";
type Children ={
    children?: React.ReactNode
}
export function OutsetHeadersCornerRadius({children} : Children){
    return(
        <div className="header-elements" style={{position:"sticky", top:"var(--top-bar-height)", zIndex: "15"}}>
            {children}
        </div>
    );
}