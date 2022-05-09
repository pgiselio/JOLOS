<!DOCTYPE html>
<html lang="pt-br">
<body style="text-align:center">

    <img src="https://ifjobs.vercel.app/images/logo.png" alt="logo ifjobs" height="45"/>
    <h1 style="color: white; padding: 40px; background-color: #4CAF50;">Bem vind@!</h1>

    <p style="color: rgb(88, 88, 88);">
        Estamos a um passo de terminar esses laços burocráticos 
        para que você possa se cadastrar e começar a usar o nosso sistema.
    </p>

    <p style="color: rgb(88, 88, 88); margin-bottom: 5px">Seu código é:</p>
    <p style="color: rgb(88, 88, 88); font-size:22px; margin: 0">${usuario.codigoAutenticacao}</p>

    <p style="color: rgb(88, 88, 88);">
        Para finalizar seu cadastro, clique no botão abaixo.
        <br/>
        <br/>
        
        <!-- button with style google, but with the color green -->
        <a href="https://ifjobs.vercel.app/cadastro/step2?email=${usuario.email}&codigo=${usuario.codigoAutenticacao}" 
        style="background-color: #4CAF50; padding: 0.5rem; color: white; border-radius: 5px; text-decoration: none;">
            <strong>
                Confirmar Cadastro
            </strong>
        </a>

        <br/>
        <br/>
        <br/>
        <br/>

        <p>
            caso o botão não funcione, copie e cole o link abaixo no seu navegador:
            https://ifjobs.vercel.app/cadastro/step2?email=${usuario.email}&codigo=${usuario.codigoAutenticacao}
        </p>

        <br/>
        <br/>
        <br/>
        <br/>
        
        <footer>
            <p style="color: rgb(88, 88, 88);">
                <strong>
                    Atenciosamente,
                </strong>
                <br>
                <strong>
                    COEX
                </strong>
            <p style="color: rgb(88, 88, 88); margin:0">Coordenação de Extensão</p>
            </p>
            
        </footer>
    </p>
</body>
</html>