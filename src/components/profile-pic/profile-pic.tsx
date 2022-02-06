import { CSSProperties } from "react";
import "./profile-pic.css";

const defaultProfilePic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
type ProfilePic = {
    url?: string
    style: CSSProperties
}
export function ProfilePic(props: ProfilePic){
    return(
        <div className="profile-pic" style={props.style}>
            <span className="default-profile">
                <img src={defaultProfilePic} alt="Foto de perfil padrão"/>
            </span>
            {
                props.url &&
                <img className="img-perfil" src={props.url}/>
            }
        </div>
        
    );
}