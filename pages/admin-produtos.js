"use strict";

/*==================================================
CACHE
==================================================*/

const listaProdutos =

document.getElementById(

    "listaProdutos"

);

const pesquisaProduto =

document.getElementById(

    "pesquisaProduto"

);

const btnNovoProduto =

document.getElementById(

    "btnNovoProduto"

);

/*==================================================
ESTADO
==================================================*/

let produtos = [];

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciar

);

function iniciar(){

    carregarProdutos();

    registrarEventos();

}

/*==================================================
CARREGAR
==================================================*/

function carregarProdutos(){

    produtos =

    Storage.getProdutos() || [];

    renderizar();

}

/*==================================================
RENDER
==================================================*/

function renderizar(){

    listaProdutos.innerHTML="";

    if(produtos.length===0){

        listaProdutos.innerHTML=`

        <div class="sem-produtos">

            <i class="fa-solid fa-box-open"></i>

            <h2>

                Nenhum produto cadastrado

            </h2>

            <p>

                Clique em "Novo Produto".

            </p>

        </div>

        `;

        return;

    }

}

/*==================================================
EVENTOS
==================================================*/

function registrarEventos(){

    if(btnNovoProduto){

        btnNovoProduto.addEventListener(

            "click",

            ()=>{

                alert(

                    "Cadastro de produtos será implementado na Parte 2."

                );

            }

        );

    }

}

Storage.log(

    "Módulo Produtos iniciado."

);