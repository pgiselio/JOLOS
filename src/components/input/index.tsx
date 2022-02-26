import { HTMLInputTypeAttribute, useState } from "react";
import { InputContainer, InputPassStyled, InputStyled, ShowPasswordButton } from "./styles";

type input = {
  id?: string;
  name?: string;
  placeholder?: string;
  spellCheck?: boolean;
  type: HTMLInputTypeAttribute;
  icon?: string;
};

export function Input({ id, name, placeholder, spellCheck, type, icon }: input) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    (type.match("text") && (
      <InputContainer>
        <InputStyled 
        id={id} 
        name={name} 
        type={type} 
        placeholder={placeholder} 
        spellCheck={spellCheck} 
        {...icon && {hasIcon: true}}/>
        {icon && <i className={icon}></i>}
      </InputContainer>
    )) 
    || (type.match("password") && (
      <InputContainer>
        <InputPassStyled
          type={showPassword ? "text" : "password"}
          id={id} 
          name={name} 
          placeholder={placeholder} 
          spellCheck={spellCheck} 
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
    || (<InputStyled type={type} placeholder="password" />)
  );
}
