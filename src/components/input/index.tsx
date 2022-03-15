import { HTMLInputTypeAttribute, useState } from "react";
import { InputContainer, InputPassStyled, InputStyled, ShowPasswordButton } from "./styles";

interface input{
  name?: string;
  type: HTMLInputTypeAttribute;
  icon?: string;
  [x:string]: any;
};

export function Input({ name, type, icon, ...rest }: input) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    (type.match("text") && (
      <InputContainer>
        <InputStyled 
        name={name} 
        type={type}
        {...rest} 
        {...icon && {hasIcon: true}}
        />
        {icon && <i className={icon}></i>}
      </InputContainer>
    )) 
    || (type.match("password") && (
      <InputContainer>
        <InputPassStyled
          type={showPassword ? "text" : "password"} 
          name={name} 
          {...rest}
          {...icon && {hasIcon: true}}
        />
        {icon && <i className={icon}></i>}        
        <ShowPasswordButton
          type="button"
          title={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className={showPassword ? "active" : ""}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      </InputContainer>
    )) 
    || (<InputStyled type={type} name={name} {...rest} />)
  );
}
