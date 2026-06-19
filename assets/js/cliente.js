/*==================================================
 EL PRADO BURGUER
 cliente.js
 Release 7.3
 Arquitetura Storage V2
==================================================*/

"use strict";

/*==================================================
CACHE DOS ELEMENTOS
==================================================*/

const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");

const cadastroContainer = document.getElementById("cadastroCliente");
const painelCliente = document.getElementById("painelCliente");

const btnAbrirCadastro = document.getElementById("abrirCadastro");
const btnVoltarLogin = document.getElementById("voltarLogin");

const btnPerfil = document.getElementById("btnPerfil");
const btnPedidos = document.getElementById("btnPedidos");
const btnEnderecos = document.getElementById("btnEnderecos");
const btnFavoritos = document.getElementById("btnFavoritos");
const btnConfiguracoes = document.getElementById("btnConfiguracoes");
const btnSair = document.getElementById("btnSair");

const nomeCliente = document.getElementById("nomeCliente");
const conteudoPainel = document.getElementById("conteudoPainel");

/*==================================================
ESTADO DA APLICAÇÃO
==================================================*/

let clientes = [];

let clienteLogado = null;

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener("DOMContentLoaded", iniciarSistema);

function iniciarSistema(){

    carregarDados();

    registrarEventos();

    verificarSessao();

}

/*==================================================
CARREGAMENTO
==================================================*/

function carregarDados(){

    clientes = Storage.getClientes();

    clienteLogado = Storage.getUsuario();

}

/*==================================================
REGISTRO DE EVENTOS
==================================================*/

function registrarEventos(){

    if(btnAbrirCadastro){

        btnAbrirCadastro.addEventListener(

            "click",

            abrirCadastro

        );

    }

    if(btnVoltarLogin){

        btnVoltarLogin.addEventListener(

            "click",

            voltarLogin

        );

    }

    if(formCadastro){

        formCadastro.addEventListener(

            "submit",

            cadastrarCliente

        );

    }

    if(formLogin){

        formLogin.addEventListener(

            "submit",

            realizarLogin

        );

    }

    if(btnPerfil){

        btnPerfil.addEventListener(

            "click",

            abrirPerfil

        );

    }

    if(btnPedidos){

        btnPedidos.addEventListener(

            "click",

            abrirPedidos

        );

    }

    if(btnEnderecos){

        btnEnderecos.addEventListener(

            "click",

            abrirEnderecos

        );

    }

    if(btnFavoritos){

        btnFavoritos.addEventListener(

            "click",

            abrirFavoritos

        );

    }

    if(btnConfiguracoes){

        btnConfiguracoes.addEventListener(

            "click",

            abrirConfiguracoes

        );

    }

    if(btnSair){

        btnSair.addEventListener(

            "click",

            logout

        );

    }

}

/*==================================================
SESSÃO
==================================================*/

function verificarSessao(){

    if(

        Storage.estaLogado()

    ){

        clienteLogado =

            Storage.getUsuario();

        mostrarPainel();

    }

}

/*==================================================
TELAS
==================================================*/

function abrirCadastro(){

    formLogin.style.display = "none";

    cadastroContainer.style.display = "block";

}

function voltarLogin(){

    cadastroContainer.style.display = "none";

    formLogin.style.display = "block";

}

/*==================================================
UTILITÁRIOS
==================================================*/

function atualizarDados(){

    clientes = Storage.getClientes();

    clienteLogado = Storage.getUsuario();

}

function mostrarMensagem(texto){

    alert(texto);

}

function limparFormulario(form){

    if(form){

        form.reset();

    }

}
/*==================================================
CADASTRO
==================================================*/

function cadastrarCliente(e){

    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const telefone = document.getElementById("telefone").value.trim();

    const email = document.getElementById("emailCadastro").value.trim().toLowerCase();

    const senha = document.getElementById("senhaCadastro").value;

    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if(nome === ""){

        return mostrarMensagem("Informe seu nome.");

    }

    if(email === ""){

        return mostrarMensagem("Informe seu e-mail.");

    }

    if(telefone === ""){

        return mostrarMensagem("Informe seu telefone.");

    }

    if(senha.length < 6){

        return mostrarMensagem("A senha deve possuir pelo menos 6 caracteres.");

    }

    if(senha !== confirmarSenha){

        return mostrarMensagem("As senhas não conferem.");

    }

    if(Storage.clienteExiste(email)){

        return mostrarMensagem("Este e-mail já está cadastrado.");

    }

    Storage.salvarCliente({

        id: Storage.gerarId(),

        nome,

        telefone,

        email,

        senha,

        favoritos: [],

        pedidos: [],

        endereco: {},

        ativo: true,

        dataCadastro: Storage.dataAtual()

    });

    atualizarDados();

    mostrarMensagem("Cadastro realizado com sucesso!");

    limparFormulario(formCadastro);

    voltarLogin();

}

/*==================================================
LOGIN
==================================================*/

function realizarLogin(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();

    const senha = document.getElementById("senha").value;

    const cliente = Storage.getClientePorEmail(email);

    if(!cliente){

        return mostrarMensagem("Cliente não encontrado.");

    }

    if(cliente.senha !== senha){

        return mostrarMensagem("Senha incorreta.");

    }

    Storage.login(cliente);

    atualizarDados();

    mostrarPainel();

}

/*==================================================
PAINEL
==================================================*/

function mostrarPainel(){

    const cardLogin = document.querySelector(".cliente-card");

    if(cardLogin){

        cardLogin.style.display = "none";

    }

    if(painelCliente){

        painelCliente.style.display = "block";

    }

    if(nomeCliente){

        nomeCliente.innerHTML = `Olá, ${clienteLogado.nome} 👋`;

    }

    abrirPerfil();

}

/*==================================================
PERFIL
==================================================*/

function abrirPerfil(){

    conteudoPainel.innerHTML = `

        <section class="perfil-container">

            <h2>

                Meu Perfil

            </h2>

            <div class="perfil-grid">

                <div class="perfil-item">

                    <strong>Nome</strong>

                    <span>${clienteLogado.nome}</span>

                </div>

                <div class="perfil-item">

                    <strong>E-mail</strong>

                    <span>${clienteLogado.email}</span>

                </div>

                <div class="perfil-item">

                    <strong>Telefone</strong>

                    <span>${clienteLogado.telefone}</span>

                </div>

                <div class="perfil-item">

                    <strong>Cliente desde</strong>

                    <span>

                        ${formatarData(clienteLogado.dataCadastro)}

                    </span>

                </div>

            </div>

        </section>

    `;

}

/*==================================================
FORMATAÇÃO
==================================================*/

function formatarData(data){

    if(!data){

        return "-";

    }

    return new Date(data)

    .toLocaleDateString(

        "pt-BR"

    );

}

/*==================================================
AUTO LOGIN
==================================================*/

function verificarSessao(){

    if(

        Storage.estaLogado()

    ){

        clienteLogado =

        Storage.getUsuario();

        mostrarPainel();

    }

}
/*==================================================
PEDIDOS
==================================================*/

function abrirPedidos(){

    renderPedidos();

}

function renderPedidos(){

    const pedidos = Storage.getPedidosCliente(

        clienteLogado.id

    );

    if(pedidos.length === 0){

        conteudoPainel.innerHTML = `

            <section class="estado-vazio">

                <i class="fa-solid fa-bag-shopping"></i>

                <h2>Meus Pedidos</h2>

                <p>

                    Você ainda não realizou nenhum pedido.

                </p>

            </section>

        `;

        return;

    }

    let html = `

        <section>

            <h2>Meus Pedidos</h2>

    `;

    pedidos.forEach(pedido => {

        html += `

            <div class="pedido-card">

                <div class="pedido-topo">

                    <strong>

                        Pedido #${pedido.id}

                    </strong>

                    <span class="status">

                        ${pedido.status}

                    </span>

                </div>

                <p>

                    Total: R$ ${Number(

                        pedido.total

                    ).toFixed(2)}

                </p>

            </div>

        `;

    });

    html += "</section>";

    conteudoPainel.innerHTML = html;

}

/*==================================================
ENDEREÇOS
==================================================*/

function abrirEnderecos(){

    renderEnderecos();

}

function renderEnderecos(){

    const endereco =

        clienteLogado.endereco || {};

    conteudoPainel.innerHTML = `

        <section>

            <h2>Meu Endereço</h2>

            <div class="perfil-grid">

                <div class="perfil-item">

                    <strong>CEP</strong>

                    <span>${endereco.cep || "-"}</span>

                </div>

                <div class="perfil-item">

                    <strong>Rua</strong>

                    <span>${endereco.rua || "-"}</span>

                </div>

                <div class="perfil-item">

                    <strong>Número</strong>

                    <span>${endereco.numero || "-"}</span>

                </div>

                <div class="perfil-item">

                    <strong>Bairro</strong>

                    <span>${endereco.bairro || "-"}</span>

                </div>

                <div class="perfil-item">

                    <strong>Cidade</strong>

                    <span>${endereco.cidade || "-"}</span>

                </div>

                <div class="perfil-item">

                    <strong>Estado</strong>

                    <span>${endereco.estado || "-"}</span>

                </div>

            </div>

        </section>

    `;

}

/*==================================================
FAVORITOS
==================================================*/

function abrirFavoritos(){

    renderFavoritos();

}

function renderFavoritos(){

    const favoritos =

        clienteLogado.favoritos || [];

    if(favoritos.length===0){

        conteudoPainel.innerHTML = `

            <section class="estado-vazio">

                <i class="fa-solid fa-heart"></i>

                <h2>Favoritos</h2>

                <p>

                    Nenhum produto favoritado.

                </p>

            </section>

        `;

        return;

    }

    conteudoPainel.innerHTML = `

        <section>

            <h2>

                Favoritos

            </h2>

            <p>

                Total de favoritos:

                ${favoritos.length}

            </p>

        </section>

    `;

}
/*==================================================
CONFIGURAÇÕES
==================================================*/

function abrirConfiguracoes(){

    renderConfiguracoes();

}

function renderConfiguracoes(){

    conteudoPainel.innerHTML = `

        <section class="configuracoes-container">

            <h2>

                Configurações da Conta

            </h2>

            <div class="perfil-grid">

                <button
                    class="btn-primary"
                    onclick="editarPerfil()">

                    Editar Perfil

                </button>

                <button
                    class="btn-primary"
                    onclick="editarEndereco()">

                    Editar Endereço

                </button>

            </div>

        </section>

    `;

}

/*==================================================
EDITAR PERFIL
==================================================*/

function editarPerfil(){

    const nome = prompt(

        "Nome:",

        clienteLogado.nome || ""

    );

    if(nome === null) return;

    const telefone = prompt(

        "Telefone:",

        clienteLogado.telefone || ""

    );

    if(telefone === null) return;

    Storage.atualizarCliente(

        clienteLogado.id,

        {

            nome,

            telefone

        }

    );

    atualizarDados();

    clienteLogado = Storage.getUsuario();

    nomeCliente.innerHTML =

        `Olá, ${clienteLogado.nome} 👋`;

    abrirPerfil();

}

/*==================================================
EDITAR ENDEREÇO
==================================================*/

function editarEndereco(){

    const endereco =

        clienteLogado.endereco || {};

    const rua = prompt(

        "Rua:",

        endereco.rua || ""

    );

    if(rua === null) return;

    const numero = prompt(

        "Número:",

        endereco.numero || ""

    );

    if(numero === null) return;

    const bairro = prompt(

        "Bairro:",

        endereco.bairro || ""

    );

    if(bairro === null) return;

    const cidade = prompt(

        "Cidade:",

        endereco.cidade || ""

    );

    if(cidade === null) return;

    const estado = prompt(

        "Estado:",

        endereco.estado || ""

    );

    if(estado === null) return;

    Storage.atualizarCliente(

        clienteLogado.id,

        {

            endereco:{

                ...endereco,

                rua,

                numero,

                bairro,

                cidade,

                estado

            }

        }

    );

    atualizarDados();

    clienteLogado = Storage.getUsuario();

    abrirEnderecos();

}

/*==================================================
LOGOUT
==================================================*/

function logout(){

    Storage.logout();

    clienteLogado = null;

    window.location.reload();

}

/*==================================================
ATUALIZA SESSÃO
==================================================*/

function atualizarSessao(){

    if(clienteLogado){

        Storage.login(

            Storage.getCliente(

                clienteLogado.id

            )

        );

    }

}

/*==================================================
FINALIZAÇÃO
==================================================*/

Storage.log(

    "cliente.js carregado com sucesso."

);