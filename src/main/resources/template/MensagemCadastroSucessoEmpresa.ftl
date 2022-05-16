<!DOCTYPE html>
<html lang="pt-br">
<body>

    <table style="text-align: center; margin: auto">

        <thead>
            <tr>
                <td>
                    <img src="https://ifjobs.vercel.app/images/logo.png" alt="logo ifjobs" height="45"/>
                </td>
            </tr>
            <tr>
                <td>
                    <h1 style="color: white; padding: 40px; background-color: #4CAF50;">Cadastro realizado com sucesso!</h1>
                </td>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>
                    <p style="color: rgb(88, 88, 88);">
                        Agora você tem acesso a nossa plataforma, esperamos que tenha um ótimo dia!
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <div style="padding: 40px; background-color: rgb(233, 233, 233); border-radius: 10px">
                        <p style="text-align: center;font-size: 18px; color: rgb(88, 88, 88);">
                            <strong>Usuário:</strong> ${usuario.email}
                        </p>
                        <p style="text-align: center;font-size: 18px;color: rgb(88, 88, 88);">
                            <strong>Senha:</strong> ${usuario.senha}
                        </p>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <p style="color: rgb(88, 88, 88);">
                        <strong>Acesse o sistema clicando no link abaixo:</strong>
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://ifjobs.vercel.app/entrar">
                        <button style="background-color: #4CAF50;
                        border: none;
                        color: white;
                        padding: 12px 20px;
                        border-radius: 5px;
                        font-size: 16px;
                        cursor: pointer;">
                            Acessar
                        </button>
                    </a>
                </td>
            </tr>
            <tr>
                <td>
                    <p style="text-align: center;color: rgb(88, 88, 88);">
                        <strong>Ou copie e cole o link abaixo no seu navegador:</strong>
                    </p>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://ifjobs.vercel.app/entrar">https://ifjobs.vercel.app/entrar</a>
                </td>
            </tr>
        </tbody>
        
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