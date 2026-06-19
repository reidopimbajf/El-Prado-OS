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

    if(btnWhatsapp){

        btnWhatsapp.onclick = enviarWhatsapp;

    }

    if(btnComprovante){

        btnComprovante.onclick = gerarComprovante;

    }

    if(btnConta){

        btnConta.onclick = ()=>{

            window.location.href="cliente.html";

        };

    }

    if(btnNovoPedido){

        btnNovoPedido.onclick = ()=>{

            window.location.href="cardapio.html";

        };

    }

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
WHATSAPP
==================================================*/

function enviarWhatsapp(){

    const telefoneLoja = "5511999999999";

    let mensagem =

`🍔 *EL PRADO BURGUER*

Olá!

Acabei de realizar um pedido.

📦 Pedido: #${pedido.id}

👤 Cliente:
${pedido.clienteNome}

📱 Telefone:
${pedido.telefone}

━━━━━━━━━━━━━━

🍔 ITENS

`;

    pedido.itens.forEach(item=>{

        mensagem +=

`• ${item.quantidade}x ${item.nome}
`;

    });

    mensagem += `

━━━━━━━━━━━━━━

💳 Pagamento:
${pedido.pagamento.toUpperCase()}

💰 Total:
${moeda(pedido.total)}

Obrigado!`;

    window.open(

        `https://wa.me/${telefoneLoja}?text=${encodeURIComponent(mensagem)}`,

        "_blank"

    );

}
/*==================================================
COMPROVANTE
==================================================*/

function gerarComprovante(){

    const janela = window.open("", "_blank");

    let itens = "";

    pedido.itens.forEach(item=>{

        itens += `
            <tr>
                <td>${item.quantidade}x</td>
                <td>${item.nome}</td>
                <td style="text-align:right;">
                    ${moeda(item.preco * item.quantidade)}
                </td>
            </tr>
        `;

    });

    janela.document.write(`

<!DOCTYPE html>

<html lang="pt-BR">

<head>

<meta charset="UTF-8">

<title>

Comprovante

</title>

<style>

body{

font-family:Arial,sans-serif;

padding:40px;

color:#222;

}

h1{

text-align:center;

margin-bottom:5px;

}

h2{

text-align:center;

color:#888;

margin-top:0;

font-size:18px;

}

table{

width:100%;

border-collapse:collapse;

margin-top:25px;

}

th,td{

padding:10px;

border-bottom:1px solid #ddd;

}

.total{

margin-top:30px;

font-size:22px;

font-weight:bold;

text-align:right;

}

.info{

margin-top:30px;

line-height:1.8;

}

.footer{

margin-top:60px;

text-align:center;

font-size:13px;

color:#777;

}

</style>

</head>

<body>

<h1>

EL PRADO BURGUER

</h1>

<h2>

Comprovante do Pedido

</h2>

<div class="info">

<strong>Pedido:</strong> #${pedido.id}<br>

<strong>Cliente:</strong> ${pedido.clienteNome}<br>

<strong>Telefone:</strong> ${pedido.telefone}<br>

<strong>Pagamento:</strong> ${pedido.pagamento.toUpperCase()}<br>

<strong>Status:</strong> ${pedido.status}<br>

<strong>Data:</strong> ${new Date(pedido.data).toLocaleString("pt-BR")}<br>

</div>

<table>

<thead>

<tr>

<th>Qtd</th>

<th>Produto</th>

<th>Total</th>

</tr>

</thead>

<tbody>

${itens}

</tbody>

</table>

<div class="total">

TOTAL: ${moeda(pedido.total)}

</div>

<div class="footer">

Obrigado pela preferência ❤️

<br>

El Prado Burguer

</div>

</body>

</html>

`);

    janela.document.close();

    janela.print();

}
/*==================================================
LOG
==================================================*/

Storage.log(

    "Pedido Sucesso carregado."

);