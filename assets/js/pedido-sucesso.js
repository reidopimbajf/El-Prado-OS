/*==================================================
 EL PRADO BURGUER
 pedido-sucesso.js
 Sprint 8.3
==================================================*/

"use strict";

/*==================================================
CACHE
==================================================*/

const resumoPedido =
document.getElementById("pedidoResumo");

const btnWhatsapp =
document.getElementById("btnWhatsapp");

const btnComprovante =
document.getElementById("btnComprovante");

const btnConta =
document.getElementById("btnConta");

const btnNovoPedido =
document.getElementById("btnNovoPedido");

/*==================================================
ESTADO
==================================================*/

let pedido = null;

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciar

);

function iniciar(){

    carregarPedido();

    renderizarPedido();

    registrarEventos();

}

/*==================================================
CARREGAR PEDIDO
==================================================*/

function carregarPedido(){

    const parametros =

        new URLSearchParams(

            window.location.search

        );

    const id = Number(

        parametros.get("id")

    );

    pedido = Storage.getPedido(id);

    if(!pedido){

        alert(

            "Pedido não encontrado."

        );

        window.location.href="cliente.html";

    }

}

/*==================================================
RESUMO
==================================================*/

function renderizarPedido(){

    if(!pedido){

        return;

    }

    let itensHTML="";

    pedido.itens.forEach(item=>{

        itensHTML += `

        <div class="resumo-item">

            <span>

                ${item.quantidade}x ${item.nome}

            </span>

            <strong>

                ${moeda(

                    item.preco *

                    item.quantidade

                )}

            </strong>

        </div>

        `;

    });

    resumoPedido.innerHTML = `

        <div class="resumo-item">

            <span>

                Pedido

            </span>

            <strong>

                #${pedido.id}

            </strong>

        </div>

        <div class="resumo-item">

            <span>

                Cliente

            </span>

            <strong>

                ${pedido.clienteNome}

            </strong>

        </div>

        <div class="resumo-item">

            <span>

                Status

            </span>

            <strong>

                ${pedido.status}

            </strong>

        </div>

        <div class="resumo-item">

            <span>

                Pagamento

            </span>

            <strong>

                ${pedido.pagamento.toUpperCase()}

            </strong>

        </div>

        ${itensHTML}

        <div class="resumo-item">

            <span>

                Total

            </span>

            <strong>

                ${moeda(pedido.total)}

            </strong>

        </div>

    `;

}

/*==================================================
EVENTOS
==================================================*/

function registrarEventos(){

    btnConta.onclick = ()=>{

        window.location.href="cliente.html";

    };

    btnNovoPedido.onclick = ()=>{

        window.location.href="cardapio.html";

    };

}

/*==================================================
UTILITÁRIO
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
LOG
==================================================*/

Storage.log(

    "Pedido Sucesso carregado."

);