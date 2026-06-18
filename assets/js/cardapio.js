/*==================================================
 EL PRADO BURGUER
 CARDAPIO.JS
==================================================*/

document.addEventListener("DOMContentLoaded", iniciarCardapio);

/*==================================================
 INICIAR
==================================================*/

let produtos = [];
let categoriaAtual = "todos";

function iniciarCardapio(){

    produtos = obterProdutos();

    renderizarProdutos(produtos);

    atualizarCarrinho();

    configurarPesquisa();

    configurarCategorias();

}

/*==================================================
 RENDERIZAR PRODUTOS
==================================================*/

function renderizarProdutos(lista){

    const container = document.getElementById("listaProdutos");

    if(!container){

        return;

    }

    container.innerHTML = "";

    if(lista.length === 0){

        container.innerHTML = `

        <div class="sem-produtos">

            <h2>

            Nenhum produto encontrado.

            </h2>

        </div>

        `;

        return;

    }

    lista.forEach(produto=>{

        container.innerHTML += criarCard(produto);

    });

}

/*==================================================
 CARD
==================================================*/

function criarCard(produto){

    return `

<div class="produto-card">

<div class="produto-imagem">

<img

src="${produto.imagem}"

alt="${produto.nome}"

>

${produto.promocao ?

'<span class="badge-promocao">PROMOÇÃO</span>'

:

''}

${produto.destaque ?

'<span class="badge-destaque">DESTAQUE</span>'

:

''}

</div>

<div class="produto-info">

<div class="produto-avaliacao">

<div class="estrelas">

★★★★★

</div>

<span class="nota">

4.9

</span>

</div>

<h3>

${produto.nome}

</h3>

<p>

${produto.descricao}

</p>

<div class="produto-tempo">

⏱️ 20-35 min

</div>

<div class="produto-footer">

<span class="preco">

R$ ${produto.preco.toFixed(2).replace(".",",")}

</span>

</div>

<div class="produto-botoes">

<button

class="btn-detalhes-card"

onclick="verDetalhes(${produto.id})">

Detalhes

</button>

<button

class="btn-adicionar"

onclick="adicionarCarrinho(${produto.id})">

Adicionar

</button>

</div>

</div>

</div>

`;

}
/*==================================================
 PESQUISA
==================================================*/

function configurarPesquisa(){

    const campo = document.getElementById("pesquisa");

    if(!campo){

        return;

    }

    campo.addEventListener("input", function(){

        filtrarProdutos();

    });

}

/*==================================================
 CATEGORIAS
==================================================*/

function configurarCategorias(){

    const botoes = document.querySelectorAll(".categoria");

    botoes.forEach(botao=>{

        botao.addEventListener("click",()=>{

            botoes.forEach(item=>{

                item.classList.remove("ativa");

            });

            botao.classList.add("ativa");

            categoriaAtual = botao.dataset.categoria;

            filtrarProdutos();

        });

    });

}

/*==================================================
 FILTRO
==================================================*/

function filtrarProdutos(){

    const texto = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    const lista = produtos.filter(produto=>{

        const categoriaOk =

            categoriaAtual === "todos"

            ||

            produto.categoria === categoriaAtual;

        const pesquisaOk =

            produto.nome
                .toLowerCase()
                .includes(texto)

            ||

            produto.descricao
                .toLowerCase()
                .includes(texto);

        return categoriaOk && pesquisaOk;

    });

    renderizarProdutos(lista);

}

/*==================================================
 CARRINHO
==================================================*/

function adicionarCarrinho(id){

    const produto = produtos.find(item=>item.id===id);

    if(!produto){

        return;

    }

    let carrinho = obterCarrinho();

    const existente = carrinho.find(

        item=>item.id===id

    );

    if(existente){

        existente.quantidade++;

    }else{

        carrinho.push({

            ...produto,

            quantidade:1

        });

    }

    salvarCarrinho(carrinho);

    atualizarCarrinho();

    renderizarCarrinho();

}

/*==================================================
 CONTADOR
==================================================*/

function atualizarCarrinho(){

    const contador = document.getElementById("contadorCarrinho");

    if(!contador){

        return;

    }

    const carrinho = obterCarrinho();

    const quantidade = carrinho.reduce(

        (total,item)=>

        total + item.quantidade,

        0

    );

    contador.textContent = quantidade;

}

/*==================================================
 DETALHES
==================================================*/

function verDetalhes(id){

    const produto = produtos.find(

        item=>item.id===id

    );

    if(!produto){

        return;

    }

    alert(

`${produto.nome}

Preço: R$ ${produto.preco.toFixed(2).replace(".",",")}

${produto.descricao}`

    );

}
/*==================================================
 RENDERIZAR CARRINHO
==================================================*/

function renderizarCarrinho(){

    const lista = document.getElementById("listaCarrinho");
    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("totalPedido");
    const quantidade = document.getElementById("quantidadeItens");

    if(!lista){

        return;

    }

    const carrinho = obterCarrinho();

    lista.innerHTML = "";

    if(carrinho.length === 0){

        lista.innerHTML = `

        <p class="carrinho-vazio">

            Seu carrinho está vazio.

        </p>

        `;

        subtotal.textContent = "R$ 0,00";
        total.textContent = "R$ 0,00";
        quantidade.textContent = "0 itens";

        return;

    }

    let valorTotal = 0;
    let totalItens = 0;

    carrinho.forEach(item=>{

        const valorItem = item.preco * item.quantidade;

        valorTotal += valorItem;

        totalItens += item.quantidade;

        lista.innerHTML += `

<div class="item-carrinho">

<div class="item-info">

<h4>${item.nome}</h4>

<p>

R$ ${item.preco.toFixed(2).replace(".",",")}

</p>

</div>

<div class="item-acoes">

<button

onclick="diminuirQuantidade(${item.id})">

−

</button>

<span>

${item.quantidade}

</span>

<button

onclick="aumentarQuantidade(${item.id})">

+

</button>

</div>

</div>

`;

    });

    subtotal.textContent =
    `R$ ${valorTotal.toFixed(2).replace(".",",")}`;

    total.textContent =
    `R$ ${valorTotal.toFixed(2).replace(".",",")}`;

    quantidade.textContent =
    `${totalItens} item(ns)`;

}

/*==================================================
 AUMENTAR
==================================================*/

function aumentarQuantidade(id){

    const carrinho = obterCarrinho();

    const item = carrinho.find(

        produto=>produto.id===id

    );

    if(item){

        item.quantidade++;

    }

    salvarCarrinho(carrinho);

    atualizarCarrinho();

    renderizarCarrinho();

}

/*==================================================
 DIMINUIR
==================================================*/

function diminuirQuantidade(id){

    let carrinho = obterCarrinho();

    const item = carrinho.find(

        produto=>produto.id===id

    );

    if(!item){

        return;

    }

    item.quantidade--;

    carrinho = carrinho.filter(

        produto=>produto.quantidade>0

    );

    salvarCarrinho(carrinho);

    atualizarCarrinho();

    renderizarCarrinho();

}

/*==================================================
 LIMPAR CARRINHO
==================================================*/

function limparPedido(){

    if(!confirm(

        "Deseja limpar todo o carrinho?"

    )){

        return;

    }

    limparCarrinho();

    atualizarCarrinho();

    renderizarCarrinho();

}

/*==================================================
 FINALIZAR
==================================================*/

function finalizarPedido(){

    const carrinho = obterCarrinho();

    if(carrinho.length===0){

        alert(

        "Seu carrinho está vazio."

        );

        return;

    }

    window.location.href =

    "checkout.html";

}

/*==================================================
 INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        renderizarCarrinho();

    }

);