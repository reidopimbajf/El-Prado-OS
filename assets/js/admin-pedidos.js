/*==================================================
 EL PRADO BURGUER
 admin-pedidos.js
 Sprint 9.1
 Parte 3
==================================================*/

"use strict";

/*==================================================
CACHE
==================================================*/

const listaPedidos =
document.getElementById("listaPedidos");

const pesquisaPedido =
document.getElementById("pesquisaPedido");

/*==================================================
ESTADO
==================================================*/

let pedidos = [];

let filtroAtual = "Todos";

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciar

);

function iniciar(){

    carregarPedidos();

    renderPedidos();

    registrarEventos();

}

/*==================================================
CARREGAR PEDIDOS
==================================================*/

function carregarPedidos(){

    pedidos = Storage.getPedidos() || [];

    pedidos.sort(

        (a,b)=>

        new Date(b.data) -

        new Date(a.data)

    );

}

/*==================================================
RENDERIZAÇÃO
==================================================*/

function renderPedidos(){

    listaPedidos.innerHTML = "";

    if(pedidos.length===0){

        listaPedidos.innerHTML = `

        <div class="sem-pedidos">

            <i class="fa-solid fa-burger"></i>

            <h2>

                Nenhum pedido encontrado

            </h2>

            <p>

                Os pedidos aparecerão aqui automaticamente.

            </p>

        </div>

        `;

        return;

    }

    pedidos.forEach(

        pedido=>{

            listaPedidos.innerHTML +=

            criarCard(pedido);

        }

    );

}

/*==================================================
CARD
==================================================*/

function criarCard(pedido){

    return `

    <div class="pedido-card">

        <div class="pedido-topo">

            <div class="numero-pedido">

                Pedido #${pedido.id}

            </div>

            <div class="status ${classeStatus(pedido.status)}">

                ${pedido.status}

            </div>

        </div>

        <div class="pedido-info">

            <p>

                <i class="fa-solid fa-user"></i>

                ${pedido.clienteNome}

            </p>

            <p>

                <i class="fa-solid fa-phone"></i>

                ${pedido.telefone}

            </p>

            <p>

                <i class="fa-solid fa-burger"></i>

                ${pedido.itens.length} item(ns)

            </p>

        </div>

        <div class="pedido-footer">

            <div class="valor">

                ${moeda(pedido.total)}

            </div>

            <div class="tempo">

                ${tempoPedido(pedido.data)}

            </div>

        </div>

        <div class="acoes">

            <button

                class="btn-ver"

                onclick="verPedido(${pedido.id})">

                <i class="fa-solid fa-eye"></i>

                Ver

            </button>

            <button

                class="btn-status"

                onclick="alterarStatus(${pedido.id})">

                <i class="fa-solid fa-rotate"></i>

                Status

            </button>

        </div>

    </div>

    `;

}

/*==================================================
STATUS
==================================================*/

function classeStatus(status){

    switch(status){

        case "Recebido":

            return "recebido";

        case "Em preparo":

            return "preparo";

        case "Saiu para entrega":

            return "entrega";

        case "Finalizado":

            return "finalizado";

        default:

            return "cancelado";

    }

}

/*==================================================
TEMPO
==================================================*/

function tempoPedido(data){

    const agora = new Date();

    const pedido = new Date(data);

    const minutos =

        Math.floor(

            (agora-pedido)/60000

        );

    if(minutos<1){

        return "Agora";

    }

    if(minutos<60){

        return `${minutos} min`;

    }

    const horas =

        Math.floor(minutos/60);

    return `${horas} h`;

}

/*==================================================
UTILITÁRIOS
==================================================*/

function moeda(valor){

    return Number(valor)

    .toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );

}

/*==================================================
EVENTOS
==================================================*/

function registrarEventos(){

    if(!pesquisaPedido){

        return;

    }

    pesquisaPedido.addEventListener(

        "input",

        pesquisarPedidos

    );

}

/*==================================================
PESQUISA
==================================================*/

function pesquisarPedidos(){

    const texto =

        pesquisaPedido.value

        .toLowerCase()

        .trim();

    const filtrados =

        pedidos.filter(

            pedido=>

            pedido.clienteNome

            .toLowerCase()

            .includes(texto)

            ||

            String(pedido.id)

            .includes(texto)

            ||

            pedido.telefone

            .includes(texto)

        );

    listaPedidos.innerHTML="";

    filtrados.forEach(

        pedido=>{

            listaPedidos.innerHTML +=

            criarCard(pedido);

        }

    );

}

/*==================================================
AÇÕES
==================================================*/

window.verPedido=function(id){

    alert(

        "Visualização do pedido #" + id +

        " será implementada na Parte 5."

    );

}

window.alterarStatus=function(id){

    alert(

        "Alteração de status será implementada na Parte 4."

    );

}

/*==================================================
MONITOR
==================================================*/

window.addEventListener(

    "storage",

    ()=>{

        carregarPedidos();

        renderPedidos();

    }

);

/*==================================================
LOG
==================================================*/

Storage.log(

    "Central de Pedidos carregada."

);