<!DOCTYPE html>
<html lang="pt-br">
<body style="display:flex; align-items: center; justify-content: center; flex-direction: column;">

    <main style="display:flex; flex-flow: column;align-items: center;width: 100%; max-width: 700px">
        <img src="https://ifjobs.vercel.app/images/logo.png" alt="logo ifjobs" height="45"/>
    <h1 style="color: white; padding: 40px; background-color: #4CAF50;">Cadastro realizado com sucesso!</h1>

    <p style="color: rgb(88, 88, 88);">
        Agora você tem acesso a nossa plataforma, esperamos que tenha um ótimo dia!
    </p>
    
    <div style="padding: 40px; background-color: rgb(233, 233, 233); border-radius: 10px">
        <p style="text-align: left;font-size: 18px; color: rgb(88, 88, 88);">
            <strong>Usuário:</strong> ${usuario.email}
        </p>
        <p style="text-align: left;font-size: 18px;color: rgb(88, 88, 88);">
            <strong>Senha:</strong> ${usuario.senha}
        </p>
    </div>

    <p style="color: rgb(88, 88, 88);">
        <strong>Acesse o sistema clicando no link abaixo:</strong>
    </p>
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

    <p style="text-align: center;color: rgb(88, 88, 88);">
        <strong>Ou copie e cole o link abaixo no seu navegador:</strong>
        <br/>
        <br/>
        <a href="https://ifjobs.vercel.app/entrar">https://ifjobs.vercel.app/entrar</a>
    </p>
    </main>

    <footer>
        <br>
        <br>
        <br>
        <br>
        <p style="text-align:center;color: rgb(88, 88, 88);">
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
</body>
</html>