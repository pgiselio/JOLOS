import { HeaderTitleStyle } from "./style"

export function HeaderTitle({children} : any){
    return(
        <HeaderTitleStyle>
            <div className="container">
                {children}
            </div>
        </HeaderTitleStyle> 
    );
}