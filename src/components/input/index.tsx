import React, { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
import { InputContainer, InputPassStyled, InputStyled, ShowPasswordButton } from "./styles";

interface input extends InputHTMLAttributes<HTMLInputElement>{
  type: HTMLInputTypeAttribute;
  icon?: string;
};

export const Input = React.forwardRef( function ({ name, type, icon, ...rest }: input, ref: React.ForwardedRef<any>) {
  const [showPassword, setShowPassword] = useState(false);

  if(type.match("text")){
    return (
        <InputContainer>
          <InputStyled 
          name={name} 
          type={type}
          ref={ref}
          {...rest} 
          {...icon && {hasIcon: true}}
          />
          {icon && <i className={icon}></i>}
        </InputContainer>
      );
  }else if(type.match("password")){
    return(
    <InputContainer>
        <InputPassStyled
          type={showPassword ? "text" : "password"} 
          name={name} 
          ref={ref}
          {...rest}
          {...icon && {hasIcon: true}}
        />
        {icon && <i className={icon}></i>}        
        <ShowPasswordButton
          tabIndex={-1}
          type="button"
          title={showPassword ? "Ocultar senha" : "Mostrar senha"}
          className={showPassword ? "active" : ""}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      </InputContainer>
    );
  }else{
    return <InputStyled type={type} name={name} ref={ref} {...rest} />;
  }
})
