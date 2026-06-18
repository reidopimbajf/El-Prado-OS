/*==================================================
 EL PRADO BURGUER
 HOME.JS
==================================================*/

document.addEventListener("DOMContentLoaded", iniciarHome);

/*==================================================
 INICIAR
==================================================*/

function iniciarHome(){

    carregarProdutosIniciais();

    renderizarDestaques();

    renderizarPromocoes();

    atualizarCarrinho();

}

/*==================================================
 PRODUTOS INICIAIS
==================================================*/

function carregarProdutosIniciais(){

    let produtos = obterProdutos();

    if(produtos.length > 0){

        return;

    }

    produtos = [

        {

            id:1,

            nome:"El Mexicano",

            descricao:"Pão brioche, carne Angus 180g, cheddar, bacon e molho da casa.",

            preco:39.90,

            categoria:"burger",

            destaque:true,

            promocao:false,

            imagem:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800"

        },

        {

            id:2,

            nome:"Prado Bacon",

            descricao:"Duplo smash, muito bacon, cheddar e cebola caramelizada.",

            preco:44.90,

            categoria:"burger",

            destaque:true,

            promocao:true,

            imagem:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=800"

        },

        {

            id:3,

            nome:"Combo El Prado",

            descricao:"Burger + Batata + Refrigerante.",

            preco:54.90,

            categoria:"combo",

            destaque:false,

            promocao:true,

            imagem:"https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=800"

        }

    ];

    salvarProdutos(produtos);

}

/*==================================================
 DESTAQUES
==================================================*/

function renderizarDestaques(){

    const container = document.getElementById("listaDestaques");

    if(!container){

        return;

    }

    const produtos = obterProdutos()

        .filter(produto => produto.destaque);

    container.innerHTML = "";

    produtos.forEach(produto=>{

        container.innerHTML += `

<div class="produto-card">

<div class="produto-imagem">

<img src="${produto.imagem}" alt="${produto.nome}">

</div>

<div class="produto-info">

<h3>${produto.nome}</h3>

<p>${produto.descricao}</p>

<div class="produto-footer">

<span class="preco">

R$ ${produto.preco.toFixed(2).replace(".",",")}

</span>

<a href="pages/cardapio.html"

class="btn-comprar">

Pedir

</a>

</div>

</div>

</div>

`;

    });

}

/*==================================================
 PROMOÇÕES
==================================================*/

function renderizarPromocoes(){

    const container = document.getElementById("listaPromocoes");

    if(!container){

        return;

    }

    const produtos = obterProdutos()

        .filter(produto=>produto.promocao);

    container.innerHTML = "";

    produtos.forEach(produto=>{

        container.innerHTML += `

<div class="promocao-card">

<span class="promocao-badge">

OFERTA

</span>

<img src="${produto.imagem}" alt="${produto.nome}">

<div class="promocao-info">

<h3>${produto.nome}</h3>

<p>${produto.descricao}</p>

<div class="promocao-preco">

<span class="preco-promocional">

R$ ${produto.preco.toFixed(2).replace(".",",")}

</span>

</div>

</div>

</div>

`;

    });

}

/*==================================================
 CARRINHO
==================================================*/

function atualizarCarrinho(){

    const contador = document.getElementById("contadorCarrinho");

    if(!contador){

        return;

    }

    contador.textContent = obterCarrinho().length;

}