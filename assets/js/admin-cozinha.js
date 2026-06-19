"use strict";

const painel =

document.getElementById(

    "painelCozinha"

);

let pedidos=[];

document.addEventListener(

    "DOMContentLoaded",

    iniciar

);

function iniciar(){

    carregarPedidos();

}
/*==================================================
CARREGAR PEDIDOS
==================================================*/

function carregarPedidos(){

    pedidos = Storage.getPedidos() || [];

    pedidos = pedidos.filter(

        pedido =>

        pedido.status === "Recebido" ||

        pedido.status === "Em preparo"

    );

    renderizarPedidos();

}

/*==================================================
RENDERIZAÇÃO
==================================================*/

function renderizarPedidos(){

    painel.innerHTML = "";

    if(pedidos.length === 0){

        painel.innerHTML = `

        <div class="cozinha-vazia">

            <i class="fa-solid fa-burger"></i>

            <h2>

                Nenhum pedido aguardando preparo

            </h2>

        </div>

        `;

        return;

    }

    pedidos.forEach(pedido=>{

        painel.innerHTML += criarCard(pedido);

    });

}

/*==================================================
CARD
==================================================*/

function criarCard(pedido){

    let itens = "";

    pedido.itens.forEach(item=>{

        itens += `

        <li>

            <strong>${item.quantidade}x</strong>

            ${item.nome}

        </li>

        `;

    });

    return `

    <div class="card-cozinha">

        <div class="card-topo">

            <span>

                Pedido #${pedido.id}

            </span>

            <span class="status">

                ${pedido.status}

            </span>

        </div>

        <h2>

            ${pedido.clienteNome}

        </h2>

        <ul>

            ${itens}

        </ul>

        <div class="observacao">

            <strong>Observação</strong>

            <p>

                ${pedido.observacao || "Nenhuma"}

            </p>

        </div>

        <button

            class="btn-cozinha"

            onclick="iniciarPreparo(${pedido.id})">

            👨🏻‍🍳

            Iniciar preparo

        </button>

    </div>

    `;

}