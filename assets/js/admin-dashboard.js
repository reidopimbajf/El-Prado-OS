/*==================================================
 EL PRADO BURGUER
 admin-dashboard.js
 ProdControl V2
 Sprint 9.0
==================================================*/

"use strict";

/*==================================================
SEGURANÇA
==================================================*/

if(!Storage.adminEstaLogado()){

    window.location.href = "admin.html";

}
/*==================================================
CACHE
==================================================*/

const cardPedidos =
document.getElementById("pedidosHoje");

const cardFaturamento =
document.getElementById("faturamentoHoje");

const cardClientes =
document.getElementById("totalClientes");

const cardProdutos =
document.getElementById("totalProdutos");

/*==================================================
ESTADO
==================================================*/

let pedidos = [];

let clientes = [];

let produtos = [];

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarDashboard

);

function iniciarDashboard(){

    carregarDados();

    atualizarCards();

}

/*==================================================
CARREGAMENTO
==================================================*/

function carregarDados(){

    pedidos = Storage.getPedidos() || [];

    clientes = Storage.getClientes() || [];

    produtos = Storage.getProdutos() || [];

}

/*==================================================
CARDS
==================================================*/

function atualizarCards(){

    atualizarPedidosHoje();

    atualizarFaturamento();

    atualizarClientes();

    atualizarProdutos();

}

/*==================================================
PEDIDOS
==================================================*/

function atualizarPedidosHoje(){

    const hoje =

        new Date()

        .toLocaleDateString("pt-BR");

    const quantidade = pedidos.filter(

        pedido =>

            new Date(

                pedido.data

            ).toLocaleDateString(

                "pt-BR"

            ) === hoje

    ).length;

    cardPedidos.innerHTML = quantidade;

}

/*==================================================
FATURAMENTO
==================================================*/

function atualizarFaturamento(){

    const hoje =

        new Date()

        .toLocaleDateString("pt-BR");

    const total = pedidos

        .filter(

            pedido =>

            new Date(

                pedido.data

            ).toLocaleDateString(

                "pt-BR"

            ) === hoje

        )

        .reduce(

            (soma,pedido)=>

            soma +

            Number(

                pedido.total || 0

            ),

            0

        );

    cardFaturamento.innerHTML =

        moeda(total);

}

/*==================================================
CLIENTES
==================================================*/

function atualizarClientes(){

    cardClientes.innerHTML =

        clientes.length;

}

/*==================================================
PRODUTOS
==================================================*/

function atualizarProdutos(){

    cardProdutos.innerHTML =

        produtos.length;

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
ATUALIZAÇÃO AUTOMÁTICA
==================================================*/

window.addEventListener(

    "storage",

    ()=>{

        carregarDados();

        atualizarCards();

    }

);

/*==================================================
LOG
==================================================*/

Storage.log(

    "Dashboard carregado."

);

console.table({

    modulo:"Dashboard",

    pedidos:pedidos.length,

    clientes:clientes.length,

    produtos:produtos.length

});
