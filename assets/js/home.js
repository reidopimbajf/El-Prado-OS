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
 PRODUTOS
==================================================*/

function carregarProdutosIniciais(){

    const produtos = obterProdutos();

    if(produtos.length === 0){

        document.getElementById("listaDestaques").innerHTML = `
            <div class="estado-vazio">
                <h3>Nenhum produto cadastrado</h3>
                <p>Os produtos cadastrados no painel administrativo aparecerão aqui.</p>
            </div>
        `;

        document.getElementById("listaPromocoes").innerHTML = `
            <div class="estado-vazio">
                <h3>Nenhuma promoção disponível</h3>
                <p>Cadastre um produto em promoção no painel administrativo.</p>
            </div>
        `;

        return;

    }

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

       .filter(produto => produto.destaque && produto.ativo);

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

        .filter(produto=>produto.promocao && produto.ativo);

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