/*==================================================
 EL PRADO BURGUER
 carrinho.js
 Sprint 8.1
 Parte 1/5
==================================================*/

"use strict";

/*==================================================
CACHE
==================================================*/

const listaCarrinho =
document.getElementById("listaCarrinho");

const subtotal =
document.getElementById("subtotal");

const entrega =
document.getElementById("entrega");

const total =
document.getElementById("total");

const btnCheckout =
document.getElementById("btnCheckout");

/*==================================================
ESTADO
==================================================*/

let carrinho = [];

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarCarrinho

);

function iniciarCarrinho(){

    carregarCarrinho();

    atualizarResumo();

    registrarEventos();

}

/*==================================================
CARREGAR STORAGE
==================================================*/

function carregarCarrinho(){

    carrinho = Storage.getCarrinho();

    renderizarCarrinho();

}

/*==================================================
EVENTOS
==================================================*/

function registrarEventos(){

    if(btnCheckout){

        btnCheckout.addEventListener(

            "click",

            finalizarCompra

        );

    }

}

/*==================================================
RENDER
==================================================*/

function renderizarCarrinho(){

    if(carrinho.length===0){

        renderCarrinhoVazio();

        return;

    }

    listaCarrinho.innerHTML="";

    carrinho.forEach(produto=>{

        listaCarrinho.innerHTML += criarCard(produto);

    });

}

/*==================================================
CARD
==================================================*/

function criarCard(produto){

    return `

    <article class="item-carrinho">

        <div class="item-imagem">

            <img
                src="${produto.imagem}"
                alt="${produto.nome}">

        </div>

        <div class="item-info">

            <h3>

                ${produto.nome}

            </h3>

            <p>

                ${produto.descricao || ""}

            </p>

            <div class="item-preco">

                R$ ${Number(

                    produto.preco

                ).toFixed(2)}

            </div>

            <div class="item-footer">

                <div class="quantidade">

                    <button
                        onclick="diminuirQuantidade(${produto.id})">

                        -

                    </button>

                    <span>

                        ${produto.quantidade}

                    </span>

                    <button
                        onclick="aumentarQuantidade(${produto.id})">

                        +

                    </button>

                </div>

                <div class="item-subtotal">

                    R$

                    ${(

                        produto.preco *

                        produto.quantidade

                    ).toFixed(2)}

                </div>

                <button
                    class="btn-remover"
                    onclick="removerProduto(${produto.id})">

                    <i class="fa-solid fa-trash"></i>

                    Remover

                </button>

            </div>

        </div>

    </article>

    `;

}
/*==================================================
ALTERAR QUANTIDADE
==================================================*/

function aumentarQuantidade(id){

    const produto = carrinho.find(

        item => item.id === id

    );

    if(!produto) return;

    produto.quantidade++;

    salvarCarrinho();

}

function diminuirQuantidade(id){

    const produto = carrinho.find(

        item => item.id === id

    );

    if(!produto) return;

    if(produto.quantidade > 1){

        produto.quantidade--;

    }else{

        removerProduto(id);

        return;

    }

    salvarCarrinho();

}

/*==================================================
REMOVER PRODUTO
==================================================*/

function removerProduto(id){

    if(!confirm(

        "Deseja remover este produto do carrinho?"

    )){

        return;

    }

    carrinho = carrinho.filter(

        item => item.id !== id

    );

    salvarCarrinho();

}

/*==================================================
SALVAR
==================================================*/

function salvarCarrinho(){

    Storage.salvarCarrinho(carrinho);

    renderizarCarrinho();

    atualizarResumo();

    atualizarContadorCarrinho();

}

/*==================================================
RESUMO
==================================================*/

function atualizarResumo(){

    let subtotalPedido = 0;

    carrinho.forEach(produto=>{

        subtotalPedido +=

            Number(produto.preco) *

            Number(produto.quantidade);

    });

    const taxaEntrega = 0;

    subtotal.innerHTML =

        "R$ " +

        subtotalPedido.toFixed(2);

    entrega.innerHTML =

        taxaEntrega === 0

        ? "Grátis"

        : "R$ " + taxaEntrega.toFixed(2);

    total.innerHTML =

        "R$ " +

        (subtotalPedido + taxaEntrega)

        .toFixed(2);

}

/*==================================================
CONTADOR
==================================================*/

function atualizarContadorCarrinho(){

    const contador =

        document.getElementById(

            "contadorCarrinho"

        );

    if(!contador) return;

    const quantidade = carrinho.reduce(

        (total,item)=>

        total + item.quantidade,

        0

    );

    contador.innerHTML = quantidade;

}

/*==================================================
CARRINHO VAZIO
==================================================*/

function renderCarrinhoVazio(){

    listaCarrinho.innerHTML = `

        <section class="carrinho-vazio">

            <i class="fa-solid fa-cart-shopping"></i>

            <h2>

                Seu carrinho está vazio

            </h2>

            <p>

                Adicione alguns produtos do cardápio.

            </p>

            <a
                href="cardapio.html"
                class="btn-continuar">

                Ir ao Cardápio

            </a>

        </section>

    `;

    subtotal.innerHTML = "R$ 0,00";

    entrega.innerHTML = "-";

    total.innerHTML = "R$ 0,00";

}
/*==================================================
FINALIZAR COMPRA
==================================================*/

function finalizarCompra(){

    if(carrinho.length === 0){

        alert(

            "Seu carrinho está vazio."

        );

        return;

    }

    const cliente = Storage.getUsuario();

    if(!cliente){

        alert(

            "Faça login antes de finalizar sua compra."

        );

        window.location.href = "cliente.html";

        return;

    }

    window.location.href = "checkout.html";

}

/*==================================================
TOTAL DE ITENS
==================================================*/

function totalItens(){

    return carrinho.reduce(

        (total,item)=>

        total + Number(item.quantidade),

        0

    );

}

/*==================================================
VALOR TOTAL
==================================================*/

function valorTotal(){

    return carrinho.reduce(

        (total,item)=>

        total +

        (

            Number(item.preco) *

            Number(item.quantidade)

        ),

        0

    );

}

/*==================================================
PROCURAR PRODUTO
==================================================*/

function buscarProduto(id){

    return carrinho.find(

        produto => produto.id === id

    );

}

/*==================================================
EXISTE PRODUTO
==================================================*/

function existeProduto(id){

    return buscarProduto(id) !== undefined;

}

/*==================================================
LIMPAR CARRINHO
==================================================*/

function limparCarrinho(){

    if(

        !confirm(

            "Deseja realmente limpar o carrinho?"

        )

    ){

        return;

    }

    carrinho = [];

    Storage.salvarCarrinho([]);

    renderizarCarrinho();

    atualizarResumo();

    atualizarContadorCarrinho();

}

/*==================================================
CONTINUAR COMPRANDO
==================================================*/

function continuarComprando(){

    window.location.href =

        "cardapio.html";

}

/*==================================================
BOTÃO FLUTUANTE (FUTURO)
==================================================*/

function atualizarBadgeCarrinho(){

    const badge =

        document.querySelector(

            ".badge-carrinho"

        );

    if(!badge) return;

    badge.innerHTML =

        totalItens();

}

/*==================================================
LOG
==================================================*/

Storage.log(

    "Carrinho carregado."

);
/*==================================================
 EL PRADO BURGUER
 CARRINHO.JS
 UTILITÁRIOS
==================================================*/

/*=========================================
 FORMATAR MOEDA
=========================================*/

function moeda(valor){

    return Number(valor || 0)

        .toLocaleString(

            "pt-BR",

            {

                style:"currency",

                currency:"BRL"

            }

        );

}

/*=========================================
 BUSCAR ITEM
=========================================*/

function buscarItem(id){

    return carrinho.find(

        item => Number(item.id) === Number(id)

    );

}

/*=========================================
 RECARREGAR
=========================================*/

function atualizarTela(){

    renderizarCarrinho();

    atualizarResumo();

    atualizarContadorCarrinho();

}

/*=========================================
 TOTAL QUANTIDADE
=========================================*/

function quantidadeItens(){

    return carrinho.reduce(

        (total,item)=>

        total + Number(item.quantidade || 0),

        0

    );

}

/*=========================================
 SUBTOTAL ITEM
=========================================*/

function subtotalItem(item){

    return Number(item.preco || 0)

        *

        Number(item.quantidade || 0);

}

/*=========================================
 SUBTOTAL PEDIDO
=========================================*/

function subtotalPedido(){

    return carrinho.reduce(

        (total,item)=>

        total + subtotalItem(item),

        0

    );

}

/*=========================================
 CARRINHO VAZIO
=========================================*/

function carrinhoVazio(){

    return carrinho.length === 0;

}

/*=========================================
 ATUALIZAR STORAGE
=========================================*/

function sincronizarCarrinho(){

    Storage.salvarCarrinho(carrinho);

    atualizarTela();

}

/*=========================================
 ANIMAÇÃO FUTURA
=========================================*/

function animarAtualizacao(){

    const resumo =

        document.querySelector(

            ".resumo-carrinho"

        );

    if(!resumo) return;

    resumo.classList.add(

        "atualizando"

    );

    setTimeout(()=>{

        resumo.classList.remove(

            "atualizando"

        );

    },300);

}
/*==================================================
 EL PRADO BURGUER
 carrinho.js
 Sprint 8.1
 Parte Final
==================================================*/

/*=========================================
CUPONS (Preparação)
=========================================*/

let cupomAplicado = null;

function aplicarCupom(codigo){

    codigo = (codigo || "").trim().toUpperCase();

    if(codigo === ""){

        alert("Informe um cupom.");

        return false;

    }

    cupomAplicado = codigo;

    Storage.log(

        "Cupom aplicado: " + codigo

    );

    atualizarResumo();

    return true;

}

/*=========================================
OBSERVAÇÃO DO PEDIDO
=========================================*/

function salvarObservacao(texto){

    const pedido = {

        observacao:texto || ""

    };

    localStorage.setItem(

        "elprado_observacao",

        JSON.stringify(pedido)

    );

}

function obterObservacao(){

    const dados = localStorage.getItem(

        "elprado_observacao"

    );

    return dados

        ? JSON.parse(dados)

        : {

            observacao:""

        };

}

/*=========================================
VERIFICAÇÃO
=========================================*/

function validarCarrinho(){

    if(carrinho.length===0){

        alert(

            "Seu carrinho está vazio."

        );

        return false;

    }

    return true;

}

/*=========================================
SINCRONIZAÇÃO
=========================================*/

window.addEventListener(

    "storage",

    function(){

        carrinho = Storage.getCarrinho();

        atualizarTela();

    }

);

/*=========================================
ATALHOS
=========================================*/

window.carrinho = {

    atualizar(){

        carrinho = Storage.getCarrinho();

        atualizarTela();

    },

    limpar(){

        limparCarrinho();

    },

    total(){

        return subtotalPedido();

    },

    quantidade(){

        return quantidadeItens();

    }

};

/*=========================================
LOG FINAL
=========================================*/

Storage.log(

    "Sprint 8.1 - Carrinho inicializado."

);

console.table({

    modulo:"Carrinho",

    versao:"8.1",

    itens:quantidadeItens(),

    total:subtotalPedido()

});
