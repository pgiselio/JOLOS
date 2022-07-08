<!DOCTYPE html>
<html lang="pt-br">
<body style="text-align:center">

    <table style="text-align:center; margin: auto">
        <thead>
            <tr>
                <td>
                    <img src="https://ifjobs.vercel.app/images/logo.png" alt="logo ifjobs" height="45"/>
                </td>
            </tr>
            <tr>
                <td>
                    <h1 style="color: white; padding: 40px; background-color: #4caf50;">
                        Bem vind@!
                    </h1>
                </td>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>
                    <p style="color: rgb(88, 88, 88);">
                        Estamos a um passo de terminar esses laços burocráticos 
                        para que você possa se cadastrar e começar a usar o nosso sistema.
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <p style="color: rgb(88, 88, 88); margin-bottom: 5px">Seu código é:</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p style="color: rgb(88, 88, 88); font-size:22px; margin: 0">${usuario.codigoAutenticacao}</p>
                </td>
            </tr>
            <tr><td><br></td></tr>
            <tr><td><br></td></tr>
            <tr>
                <td style="color: rgb(88, 88, 88);">
                    Para finalizar seu cadastro, clique no botão abaixo.
                </td>
            </tr>
            <tr><td><br></td></tr>
            <tr>
                <td>
                    <a href="https://ifjobs.vercel.app/cadastro/step2?email=${usuario.email}&codigo=${usuario.codigoAutenticacao}" 
                        target="_blank" 
                        style="background-color: #4CAF50; padding: 0.5rem; color: white; border-radius: 5px; text-decoration: none;">
                        <strong>
                            Confirmar Cadastro
                        </strong>
                    </a>
                </td>
            </tr>
            <tr><td><br></td></tr>
            <tr><td><br></td></tr>
            <tr>
                <td>
                    caso o botão não funcione, copie e cole o link abaixo no seu navegador:
                </td>
            </tr>
            <tr>
                <td>
                    https://ifjobs.vercel.app/cadastro/step2?email=${usuario.email}&codigo=${usuario.codigoAutenticacao}
                </td>
            </tr>
        </tbody>

        <tr><td><br></td></tr>
        <tr><td><br></td></tr>
        <tr><td><br></td></tr>
        <tr><td><br></td></tr>

        <tfoot>
            <tr>
                <td style="text-align:center;color: rgb(88, 88, 88);">
                    <strong>
                        Atenciosamente,
                    </strong>
                </td>
            </tr>
            <tr>
                <td style="text-align:center;color: rgb(88, 88, 88);">
                    <strong>
                        COEX
                    </strong>
                </td>
            </tr>
            <tr>
                <td style="color: rgb(88, 88, 88); text-align: center;">
                    Coordenação de Extensão
                </td>
            </tr>
        </tfoot>
    </table>
</body>
</html>