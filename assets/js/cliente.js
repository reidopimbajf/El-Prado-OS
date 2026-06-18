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

let clientes =
JSON.parse(localStorage.getItem("clientes")) || [];

let clienteLogado =
JSON.parse(localStorage.getItem("clienteLogado")) || null;


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

localStorage.setItem(

"clientes",

JSON.stringify(clientes)

);

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

clienteLogado=cliente;

localStorage.setItem(

"clienteLogado",

JSON.stringify(cliente)

);

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
// LOGOUT
// ==========================

const btnSair=

document.getElementById("btnSair");

if(btnSair){

btnSair.onclick=function(){

localStorage.removeItem(

"clienteLogado"

);

location.reload();

};

}