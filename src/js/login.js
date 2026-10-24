
// ========================================
// ESSENZA - SISTEMA DE LOGIN
// Armazenamento local com localStorage
// ========================================

const CHAVE_USUARIOS = "essenzaUsuarios";
const CHAVE_SESSAO = "essenzaUsuarioLogado";

// Elementos da página
const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");

const tabLogin = document.getElementById("tabLogin");
const tabCadastro = document.getElementById("tabCadastro");

const mensagem = document.getElementById("mensagem");

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

// Busca os usuários cadastrados
function obterUsuarios() {
    try {
        const dados = localStorage.getItem(CHAVE_USUARIOS);
        const usuarios = dados ? JSON.parse(dados) : [];

        if (!Array.isArray(usuarios)) {
            throw new Error("Dados inválidos.");
        }

        return usuarios;
    } catch (erro) {
        console.error("Erro ao ler os usuários:", erro);
        mostrarMensagem(
            "Não foi possível ler os usuários salvos.",
            "error"
        );
        return null;
    }
}

// Mostra mensagens na tela
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = "message " + tipo;
}

// Limpa a mensagem
function limparMensagem() {
    mensagem.textContent = "";
    mensagem.className = "message";
}

// Alterna entre login e cadastro
function alternarFormulario(modo) {
    limparMensagem();

    const cadastroAtivo = modo === "cadastro";

    formLogin.hidden = cadastroAtivo;
    formCadastro.hidden = !cadastroAtivo;

    tabLogin.classList.toggle("active", !cadastroAtivo);
    tabCadastro.classList.toggle("active", cadastroAtivo);
}

tabLogin.addEventListener("click", () => {
    alternarFormulario("login");
});

tabCadastro.addEventListener("click", () => {
    alternarFormulario("cadastro");
});

// ========================================
// CADASTRO DE USUÁRIOS
// ========================================

formCadastro.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparMensagem();

    const nome = document
        .getElementById("nomeCadastro")
        .value.trim();

    const email = document
        .getElementById("emailCadastro")
        .value.trim()
        .toLowerCase();

    const senha = document
        .getElementById("senhaCadastro")
        .value;

    const confirmarSenha = document
        .getElementById("confirmarSenha")
        .value;

    // Verifica o nome
    if (nome.length < 2) {
        mostrarMensagem(
            "Digite seu nome completo.",
            "error"
        );
        return;
    }

    // Verifica o tamanho da senha
    if (senha.length < 6) {
        mostrarMensagem(
            "A senha deve ter pelo menos 6 caracteres.",
            "error"
        );
        return;
    }

    // Confirma se as senhas são iguais
    if (senha !== confirmarSenha) {
        mostrarMensagem(
            "As senhas não são iguais.",
            "error"
        );
        return;
    }

    const usuarios = obterUsuarios();

    if (usuarios === null) {
        return;
    }

    // Verifica se o e-mail já foi cadastrado
    const usuarioExiste = usuarios.some(
        usuario => usuario.email === email
    );

    if (usuarioExiste) {
        mostrarMensagem(
            "Este e-mail já possui uma conta.",
            "error"
        );
        return;
    }

    // Cria o novo usuário
    const novoUsuario = {
        id: Date.now(),
        nome: nome,
        email: email,
        senha: senha
    };

    try {
        usuarios.push(novoUsuario);

        localStorage.setItem(
            CHAVE_USUARIOS,
            JSON.stringify(usuarios)
        );

        formCadastro.reset();

        mostrarMensagem(
            "Conta criada com sucesso! Agora você pode entrar.",
            "success"
        );

        // Volta para o login
        alternarFormulario("login");

        // Mostra a confirmação após alternar o formulário
        mostrarMensagem(
            "Conta criada com sucesso! Faça seu login.",
            "success"
        );

        document.getElementById("emailLogin").value = email;
        document.getElementById("senhaLogin").focus();

    } catch (erro) {
        console.error("Erro ao salvar o cadastro:", erro);

        mostrarMensagem(
            "Não foi possível salvar a conta neste navegador.",
            "error"
        );
    }
});

// ========================================
// LOGIN DE USUÁRIOS
// ========================================

formLogin.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparMensagem();

    const email = document
        .getElementById("emailLogin")
        .value.trim()
        .toLowerCase();

    const senha = document
        .getElementById("senhaLogin")
        .value;

    const usuarios = obterUsuarios();

    if (usuarios === null) {
        return;
    }

    // Procura um usuário com as credenciais informadas
    const usuarioEncontrado = usuarios.find(
        usuario =>
            usuario.email === email &&
            usuario.senha === senha
    );

    if (!usuarioEncontrado) {
        mostrarMensagem(
            "E-mail ou senha incorretos.",
            "error"
        );
        return;
    }

    // Salva apenas os dados necessários da sessão
    try {
        localStorage.setItem(
            CHAVE_SESSAO,
            JSON.stringify({
                id: usuarioEncontrado.id,
                nome: usuarioEncontrado.nome,
                email: usuarioEncontrado.email
            })
        );

        mostrarMensagem(
            "Login realizado! Redirecionando...",
            "success"
        );

        // Volta para a página inicial
        window.location.href = "../../index.html";

    } catch (erro) {
        console.error("Erro ao iniciar sessão:", erro);

        mostrarMensagem(
            "Não foi possível iniciar a sessão.",
            "error"
        );
    }
});

// ========================================
// FUNÇÃO PARA SAIR DA CONTA
// ========================================

function sairDaConta() {
    localStorage.removeItem(CHAVE_SESSAO);

    window.location.href = "src/pages/login.html";
}
