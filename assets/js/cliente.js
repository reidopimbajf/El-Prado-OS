/* =====================================================
   EL PRADO BURGUER
   cliente.js
   Sprint 7.2
=====================================================*/

// ==========================
// ELEMENTOS
// ==========================

const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");

const cadastroContainer = document.getElementById("cadastroCliente");
const painelCliente = document.getElementById("painelCliente");

const btnAbrirCadastro = document.getElementById("abrirCadastro");
const btnVoltarLogin = document.getElementById("voltarLogin");

const nomeCliente = document.getElementById("nomeCliente");


// ==========================
// STORAGE
// ==========================

function carregarClientes(){

    return JSON.parse(

        localStorage.getItem("clientes")

    ) || [];

}

function salvarClientes(clientes){

    localStorage.setItem(

        "clientes",

        JSON.stringify(clientes)

    );

}

function carregarSessao(){

    return JSON.parse(

        localStorage.getItem("clienteLogado")

    ) || null;

}

function salvarSessao(cliente){

    localStorage.setItem(

        "clienteLogado",

        JSON.stringify(cliente)

    );

}

function limparSessao(){

    localStorage.removeItem(

        "clienteLogado"

    );

}

let clientes = carregarClientes();

let clienteLogado = carregarSessao();
// ==========================
// ABRIR CADASTRO
// ==========================

if(btnAbrirCadastro){

    btnAbrirCadastro.onclick = function(){

        formLogin.style.display = "none";

        cadastroContainer.style.display = "block";

    };

}


// ==========================
// VOLTAR LOGIN
// ==========================

if(btnVoltarLogin){

    btnVoltarLogin.onclick = function(){

        cadastroContainer.style.display = "none";

        formLogin.style.display = "block";

    };

}


// ==========================
// CADASTRAR CLIENTE
// ==========================

if(formCadastro){

formCadastro.addEventListener("submit", function(e){

e.preventDefault();

const cliente = {

nome:
document.getElementById("nome").value,

telefone:
document.getElementById("telefone").value,

email:
document.getElementById("emailCadastro").value,

senha:
document.getElementById("senhaCadastro").value

};

const existe = clientes.find(c=>c.email===cliente.email);

if(existe){

alert("Este e-mail já está cadastrado.");

return;

}

clientes.push(cliente);

salvarClientes(clientes);

alert("Cadastro realizado com sucesso!");

cadastroContainer.style.display="none";

formLogin.style.display="block";

formCadastro.reset();

});

}


// ==========================
// LOGIN
// ==========================

if(formLogin){

formLogin.addEventListener("submit",function(e){

e.preventDefault();

const email=
document.getElementById("email").value;

const senha=
document.getElementById("senha").value;

const cliente=

clientes.find(c=>

c.email===email &&

c.senha===senha

);

if(!cliente){

alert("E-mail ou senha inválidos.");

return;

}

clienteLogado = cliente;

salvarSessao(cliente);

mostrarPainel();

});

}


// ==========================
// PAINEL
// ==========================

function mostrarPainel(){

document.querySelector(".cliente-card").style.display="none";

painelCliente.style.display="block";

nomeCliente.innerHTML=

"Olá, "+clienteLogado.nome+" 👋";

}


// ==========================
// AUTO LOGIN
// ==========================

if(clienteLogado){

mostrarPainel();

}

// ==========================
// PAINEL INTERATIVO
// ==========================

const btnPerfil = document.getElementById("btnPerfil");
const btnPedidos = document.getElementById("btnPedidos");
const btnEnderecos = document.getElementById("btnEnderecos");
const btnFavoritos = document.getElementById("btnFavoritos");
const btnConfiguracoes = document.getElementById("btnConfiguracoes");
const conteudoPainel = document.getElementById("conteudoPainel");

if (btnPerfil) {

    btnPerfil.addEventListener("click", () => {

        conteudoPainel.innerHTML = `
            <h2>Meu Perfil</h2>

            <div class="painel-box">

                <p><strong>Nome:</strong> ${clienteLogado.nome}</p>

                <p><strong>Email:</strong> ${clienteLogado.email}</p>

                <p><strong>Telefone:</strong> ${clienteLogado.telefone}</p>

            </div>
        `;

    });

}

if (btnPedidos) {

    btnPedidos.addEventListener("click", () => {

        conteudoPainel.innerHTML = `
            <h2>Meus Pedidos</h2>

            <p>Nenhum pedido encontrado.</p>
        `;

    });

}

if (btnEnderecos) {

    btnEnderecos.addEventListener("click", () => {

        conteudoPainel.innerHTML = `
            <h2>Meus Endereços</h2>

            <p>Nenhum endereço cadastrado.</p>
        `;

    });

}

if (btnFavoritos) {

    btnFavoritos.addEventListener("click", () => {

        conteudoPainel.innerHTML = `
            <h2>Favoritos</h2>

            <p>Você ainda não possui favoritos.</p>
        `;

    });

}

if (btnConfiguracoes) {

    btnConfiguracoes.addEventListener("click", () => {

        conteudoPainel.innerHTML = `
            <h2>Configurações</h2>

            <p>Configurações da conta.</p>
        `;

    });

}
// ==========================
// LOGOUT
// ==========================

const btnSair = document.getElementById("btnSair");

if (btnSair) {

    btnSair.addEventListener("click", () => {

        limparSessao();

        window.location.reload();

    });

}