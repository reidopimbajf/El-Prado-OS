/*==================================================
EL PRADO BURGUER
CARDAPIO.JS
VERSÃO 3.0
==================================================*/

/*==================================================
ESTADO DA APLICAÇÃO
==================================================*/

const App = {

    produtos: [],

    produtosFiltrados: [],

    produtoSelecionado: null,

    quantidade: 1,

    categoriaAtual: "todos"

};

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarCardapio

);

function iniciarCardapio(){

    carregarProdutos();

    configurarPesquisa();

    configurarCategorias();

    configurarModal();

    configurarEventos();

    atualizarCarrinho();

}

/*==================================================
CARREGAR PRODUTOS
==================================================*/

function carregarProdutos(){

    App.produtos = obterProdutos()

        .filter(produto=>produto.ativo);

    App.produtos.sort(

        (a,b)=>

        (a.ordem || 999)

        -

        (b.ordem || 999)

    );

    App.produtosFiltrados=[

        ...App.produtos

    ];

    renderizarProdutos();

}

/*==================================================
RENDERIZAÇÃO
==================================================*/

function renderizarProdutos(){

    const lista=document.getElementById(

        "listaProdutos"

    );

    const vazio=document.getElementById(

        "estadoVazio"

    );

    if(!lista){

        return;

    }

    lista.innerHTML="";

    if(App.produtosFiltrados.length===0){

        lista.style.display="none";

        vazio.style.display="block";

        return;

    }

    lista.style.display="grid";

    vazio.style.display="none";

    App.produtosFiltrados.forEach(produto=>{

        lista.innerHTML+=criarCard(produto);

    });

}

/*==================================================
CARD
==================================================*/

function criarCard(produto){

    return `

<div class="produto-card">

<div class="produto-imagem">

<img src="${produto.imagem}" alt="${produto.nome}">

<div class="badges">

${produto.promocao ? '<span class="badge promocao">Promoção</span>' : ''}

${produto.destaque ? '<span class="badge destaque">Destaque</span>' : ''}

${produto.lancamento ? '<span class="badge lancamento">Novo</span>' : ''}

</div>

</div>

<div class="produto-info">

<h3>${produto.nome}</h3>

<p>${produto.descricao}</p>

<div class="preco">

${formatarMoeda(produto.preco)}

</div>

<button

class="btn-adicionar"

onclick="abrirModal(${produto.id})">

<i class="fa-solid fa-cart-plus"></i>

Adicionar

</button>

</div>

</div>

`;

}
/*==================================================
PESQUISA
==================================================*/

function configurarPesquisa(){

    const pesquisa = document.getElementById("pesquisa");

    if(!pesquisa){

        return;

    }

    pesquisa.addEventListener("input",()=>{

        aplicarFiltros();

    });

}

/*==================================================
CATEGORIAS
==================================================*/

function configurarCategorias(){

    const botoes = document.querySelectorAll(

        ".filtros button"

    );

    botoes.forEach(botao=>{

        botao.addEventListener("click",()=>{

            botoes.forEach(btn=>

                btn.classList.remove("ativo")

            );

            botao.classList.add("ativo");

            App.categoriaAtual =

                botao.dataset.categoria;

            aplicarFiltros();

        });

    });

}

/*==================================================
FILTROS
==================================================*/

function aplicarFiltros(){

    const pesquisa = document

        .getElementById("pesquisa")

        .value

        .toLowerCase()

        .trim();

    App.produtosFiltrados =

        App.produtos.filter(produto=>{

            const categoriaValida =

                App.categoriaAtual==="todos"

                ||

                produto.categoria===App.categoriaAtual;

            const pesquisaValida =

                produto.nome

                    .toLowerCase()

                    .includes(pesquisa)

                ||

                produto.descricao

                    .toLowerCase()

                    .includes(pesquisa);

            return (

                categoriaValida

                &&

                pesquisaValida

            );

        });

    renderizarProdutos();

}

/*==================================================
ATUALIZAR LISTA
==================================================*/

function atualizarLista(){

    carregarProdutos();

    aplicarFiltros();

}
/*==================================================
MODAL
==================================================*/

function configurarModal(){

    const modal = document.getElementById("modalProduto");

    const fechar = document.getElementById("fecharModal");

    if(fechar){

        fechar.addEventListener(

            "click",

            fecharModal

        );

    }

    if(modal){

        modal.addEventListener(

            "click",

            event=>{

                if(event.target===modal){

                    fecharModal();

                }

            }

        );

    }

    document.addEventListener(

        "keydown",

        event=>{

            if(

                event.key==="Escape"

                &&

                modal.classList.contains("ativo")

            ){

                fecharModal();

            }

        }

    );

}

/*==================================================
ABRIR MODAL
==================================================*/

function abrirModal(id){

    const produto = App.produtos.find(

        item=>item.id===id

    );

    if(!produto){

        return;

    }

    App.produtoSelecionado = produto;

    App.quantidade = 1;

    document.getElementById(

        "modalImagem"

    ).src = produto.imagem;

    document.getElementById(

        "modalNome"

    ).textContent = produto.nome;

    document.getElementById(

        "modalDescricao"

    ).textContent = produto.descricao;

    document.getElementById(

        "modalCategoria"

    ).textContent = produto.categoria;

    document.getElementById(

        "modalPreco"

    ).textContent = formatarMoeda(

        produto.preco

    );

    document.getElementById(

        "quantidadeProduto"

    ).value = 1;

    document.getElementById(

        "observacoes"

    ).value = "";

    atualizarTotalModal();

    document.getElementById(

        "modalProduto"

    ).classList.add("ativo");

}

/*==================================================
FECHAR MODAL
==================================================*/

function fecharModal(){

    App.produtoSelecionado = null;

    App.quantidade = 1;

    document.getElementById(

        "quantidadeProduto"

    ).value = 1;

    document.getElementById(

        "observacoes"

    ).value = "";

    document.getElementById(

        "totalProduto"

    ).textContent =

        formatarMoeda(0);

    document.getElementById(

        "modalProduto"

    ).classList.remove("ativo");

}

/*==================================================
QUANTIDADE
==================================================*/

function configurarEventos(){

    const btnMais = document.getElementById(

        "aumentarQtd"

    );

    const btnMenos = document.getElementById(

        "diminuirQtd"

    );

    const btnAdicionar = document.getElementById(

        "btnAdicionarCarrinho"

    );

    if(btnMais){

        btnMais.addEventListener(

            "click",

            aumentarQuantidade

        );

    }

    if(btnMenos){

        btnMenos.addEventListener(

            "click",

            diminuirQuantidade

        );

    }

    if(btnAdicionar){

        btnAdicionar.addEventListener(

            "click",

            adicionarAoCarrinho

        );

    }

}

function aumentarQuantidade(){

    App.quantidade++;

    document.getElementById(

        "quantidadeProduto"

    ).value = App.quantidade;

    atualizarTotalModal();

}

function diminuirQuantidade(){

    if(App.quantidade<=1){

        return;

    }

    App.quantidade--;

    document.getElementById(

        "quantidadeProduto"

    ).value = App.quantidade;

    atualizarTotalModal();

}

/*==================================================
TOTAL
==================================================*/

function atualizarTotalModal(){

    if(!App.produtoSelecionado){

        return;

    }

    const total =

        App.produtoSelecionado.preco

        *

        App.quantidade;

    document.getElementById(

        "totalProduto"

    ).textContent =

        formatarMoeda(total);

}
/*==================================================
CARRINHO
==================================================*/

function adicionarAoCarrinho(){

    if(!App.produtoSelecionado){

        return;

    }

    const carrinho = obterCarrinho();

    const observacoes = document
        .getElementById("observacoes")
        .value
        .trim();

    const subtotal =

        App.produtoSelecionado.preco

        *

        App.quantidade;

    const itemExistente = carrinho.find(item=>

        item.id===App.produtoSelecionado.id

        &&

        item.observacoes===observacoes

    );

    if(itemExistente){

        itemExistente.quantidade += App.quantidade;

        itemExistente.subtotal =

            itemExistente.quantidade

            *

            itemExistente.precoUnitario;

    }

    else{

        carrinho.push({

            id:App.produtoSelecionado.id,

            nome:App.produtoSelecionado.nome,

            categoria:App.produtoSelecionado.categoria,

            imagem:App.produtoSelecionado.imagem,

            precoUnitario:App.produtoSelecionado.preco,

            quantidade:App.quantidade,

            subtotal:subtotal,

            observacoes:observacoes

        });

    }

    salvarCarrinho(carrinho);

    atualizarCarrinho();

    mostrarToast(

        "Produto adicionado ao carrinho!"

    );

    fecharModal();

}

/*==================================================
CONTADOR
==================================================*/

function atualizarCarrinho(){

    const contador = document.getElementById(

        "contadorCarrinho"

    );

    if(!contador){

        return;

    }

    const carrinho = obterCarrinho();

    let totalItens = 0;

    carrinho.forEach(item=>{

        totalItens += item.quantidade;

    });

    contador.textContent = totalItens;

}

/*==================================================
TOAST
==================================================*/

function mostrarToast(mensagem){

    let toast = document.getElementById("toast");

    if(!toast){

        toast = document.createElement("div");

        toast.id = "toast";

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = mensagem;

    toast.classList.add("mostrar");

    clearTimeout(toast.timeout);

    toast.timeout = setTimeout(()=>{

        toast.classList.remove("mostrar");

    },2500);

}

/*==================================================
LOADING
==================================================*/

function mostrarLoading(){

    const loading = document.getElementById("loading");

    if(loading){

        loading.classList.remove("hide");

    }

}

function esconderLoading(){

    const loading = document.getElementById("loading");

    if(loading){

        loading.classList.add("hide");

    }

}

/*==================================================
ATUALIZAR CARDÁPIO
==================================================*/

function atualizarCardapio(){

    mostrarLoading();

    carregarProdutos();

    esconderLoading();

}
/*==================================================
UTILITÁRIOS
==================================================*/

function formatarMoeda(valor){

    return Number(valor).toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );

}

function limparPesquisa(){

    const pesquisa = document.getElementById(

        "pesquisa"

    );

    if(!pesquisa){

        return;

    }

    pesquisa.value = "";

    App.categoriaAtual = "todos";

    document

        .querySelectorAll(".filtros button")

        .forEach(botao=>{

            botao.classList.remove("ativo");

        });

    const btnTodos = document.querySelector(

        '.filtros button[data-categoria="todos"]'

    );

    if(btnTodos){

        btnTodos.classList.add("ativo");

    }

    aplicarFiltros();

}

function recarregarProdutos(){

    carregarProdutos();

    atualizarCarrinho();

}

/*==================================================
API PÚBLICA
==================================================*/

window.abrirModal = abrirModal;

/*==================================================
LOG
==================================================*/

console.log(

    "%cEl Prado Burguer",

    "color:#D4AF37;font-size:16px;font-weight:bold;"

);

console.log(

    "Cardápio carregado com sucesso."

);

/*==================================================
FIM DO ARQUIVO
CARDAPIO.JS V3.0
==================================================*/