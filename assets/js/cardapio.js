/*==================================================
EL PRADO BURGUER
CARDAPIO.JS
VERSÃO 2.0
==================================================*/

let produtos = [];

let produtosFiltrados = [];

let produtoSelecionado = null;

let quantidadeSelecionada = 1;

/*==================================================
INICIAR
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

    atualizarCarrinho();

}

/*==================================================
CARREGAR PRODUTOS
==================================================*/

function carregarProdutos(){

    produtos = obterProdutos()

        .filter(produto => produto.ativo);

    produtos.sort(

        (a,b)=>

        (a.ordem || 999)

        -

        (b.ordem || 999)

    );

    produtosFiltrados = [...produtos];

    renderizarProdutos();

}

/*==================================================
RENDERIZAR
==================================================*/

function renderizarProdutos(){

    const lista = document.getElementById(

        "listaProdutos"

    );

    const estado = document.getElementById(

        "estadoVazio"

    );

    if(!lista){

        return;

    }

    lista.innerHTML = "";

    if(produtosFiltrados.length === 0){

        lista.style.display="none";

        estado.style.display="block";

        return;

    }

    lista.style.display="grid";

    estado.style.display="none";

    produtosFiltrados.forEach(produto=>{

        lista.innerHTML += criarCard(produto);

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

alt="${produto.nome}">

<div class="badges">

${produto.promocao ?

'<span class="badge promocao">Promoção</span>'

: ''}

${produto.destaque ?

'<span class="badge destaque">Destaque</span>'

: ''}

${produto.lancamento ?

'<span class="badge lancamento">Novo</span>'

: ''}

</div>

</div>

<div class="produto-info">

<h3>

${produto.nome}

</h3>

<p>

${produto.descricao}

</p>

<div class="preco">

R$ ${produto.preco.toFixed(2).replace(".",",")}

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

    pesquisa.addEventListener(

        "input",

        function(){

            const texto = this.value

                .toLowerCase()

                .trim();

            produtosFiltrados = produtos.filter(produto=>{

                return (

                    produto.nome.toLowerCase().includes(texto)

                    ||

                    produto.descricao.toLowerCase().includes(texto)

                );

            });

            renderizarProdutos();

        }

    );

}

/*==================================================
CATEGORIAS
==================================================*/

function configurarCategorias(){

    const botoes = document.querySelectorAll(

        ".filtros button"

    );

    botoes.forEach(botao=>{

        botao.addEventListener(

            "click",

            ()=>{

                botoes.forEach(btn=>

                    btn.classList.remove("ativo")

                );

                botao.classList.add("ativo");

                const categoria =

                    botao.dataset.categoria;

                if(categoria==="todos"){

                    produtosFiltrados=[...produtos];

                }else{

                    produtosFiltrados = produtos.filter(

                        produto=>

                        produto.categoria===categoria

                    );

                }

                renderizarProdutos();

            }

        );

    });

}

/*==================================================
MODAL
==================================================*/

function configurarModal(){

    const fechar = document.getElementById(

        "fecharModal"

    );

    if(fechar){

        fechar.addEventListener(

            "click",

            fecharModal

        );

    }

    const modal = document.getElementById(

        "modalProduto"

    );

    if(modal){

        modal.addEventListener(

            "click",

            function(event){

                if(event.target===modal){

                    fecharModal();

                }

            }

        );

    }

}

/*==================================================
ABRIR MODAL
==================================================*/

function abrirModal(id){

    produtoSelecionado = produtos.find(

        produto=>produto.id===id

    );

    if(!produtoSelecionado){

        return;

    }

    quantidadeSelecionada = 1;

    document.getElementById("modalImagem").src =
        produtoSelecionado.imagem;

    document.getElementById("modalNome").textContent =
        produtoSelecionado.nome;

    document.getElementById("modalDescricao").textContent =
        produtoSelecionado.descricao;

    document.getElementById("modalCategoria").textContent =
        produtoSelecionado.categoria;

    document.getElementById("modalPreco").textContent =

        produtoSelecionado.preco.toLocaleString(

            "pt-BR",

            {

                style:"currency",

                currency:"BRL"

            }

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

    document.getElementById(

        "modalProduto"

    ).classList.remove("ativo");

}
/*==================================================
QUANTIDADE
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    const aumentar=document.getElementById("aumentarQtd");

    const diminuir=document.getElementById("diminuirQtd");

    if(aumentar){

        aumentar.addEventListener(

            "click",

            aumentarQuantidade

        );

    }

    if(diminuir){

        diminuir.addEventListener(

            "click",

            diminuirQuantidade

        );

    }

    const adicionar=document.getElementById(

        "btnAdicionarCarrinho"

    );

    if(adicionar){

        adicionar.addEventListener(

            "click",

            adicionarAoCarrinho

        );

    }

});

function aumentarQuantidade(){

    quantidadeSelecionada++;

    document.getElementById(

        "quantidadeProduto"

    ).value=quantidadeSelecionada;

    atualizarTotalModal();

}

function diminuirQuantidade(){

    if(quantidadeSelecionada<=1){

        return;

    }

    quantidadeSelecionada--;

    document.getElementById(

        "quantidadeProduto"

    ).value=quantidadeSelecionada;

    atualizarTotalModal();

}

/*==================================================
TOTAL
==================================================*/

function atualizarTotalModal(){

    if(!produtoSelecionado){

        return;

    }

    const total=

        produtoSelecionado.preco

        *

        quantidadeSelecionada;

    document.getElementById(

        "totalProduto"

    ).textContent=

        total.toLocaleString(

            "pt-BR",

            {

                style:"currency",

                currency:"BRL"

            }

        );

}

/*==================================================
ADICIONAR AO CARRINHO
==================================================*/

function adicionarAoCarrinho(){

    if(!produtoSelecionado){

        return;

    }

    const carrinho=obterCarrinho();

    const observacoes=document

        .getElementById(

            "observacoes"

        )

        .value

        .trim();

    const existente=carrinho.find(

        item=>

        item.id===produtoSelecionado.id

        &&

        item.observacoes===observacoes

    );

    if(existente){

        existente.quantidade+=

            quantidadeSelecionada;

    }else{

        carrinho.push({

            id:produtoSelecionado.id,

            nome:produtoSelecionado.nome,

            preco:produtoSelecionado.preco,

            imagem:produtoSelecionado.imagem,

            quantidade:quantidadeSelecionada,

            observacoes:observacoes

        });

    }

    salvarCarrinho(carrinho);

    atualizarCarrinho();

    fecharModal();

    alert(

        "Produto adicionado ao carrinho!"

    );

}

/*==================================================
CONTADOR
==================================================*/

function atualizarCarrinho(){

    const contador=document.getElementById(

        "contadorCarrinho"

    );

    if(!contador){

        return;

    }

    const carrinho=obterCarrinho();

    let quantidade=0;

    carrinho.forEach(item=>{

        quantidade+=item.quantidade;

    });

    contador.textContent=quantidade;

}
/*==================================================
TOAST
==================================================*/

function mostrarToast(mensagem){

    let toast=document.getElementById("toast");

    if(!toast){

        toast=document.createElement("div");

        toast.id="toast";

        toast.className="toast";

        document.body.appendChild(toast);

    }

    toast.textContent=mensagem;

    toast.classList.add("mostrar");

    clearTimeout(toast.timeout);

    toast.timeout=setTimeout(()=>{

        toast.classList.remove("mostrar");

    },2500);

}

/*==================================================
ADICIONAR AO CARRINHO (NOVA VERSÃO)
==================================================*/

function adicionarAoCarrinho(){

    if(!produtoSelecionado){

        return;

    }

    const carrinho=obterCarrinho();

    const observacoes=document

        .getElementById("observacoes")

        .value

        .trim();

    const existente=carrinho.find(item=>

        item.id===produtoSelecionado.id &&

        item.observacoes===observacoes

    );

    if(existente){

        existente.quantidade+=quantidadeSelecionada;

    }else{

        carrinho.push({

            id:produtoSelecionado.id,

            nome:produtoSelecionado.nome,

            categoria:produtoSelecionado.categoria,

            imagem:produtoSelecionado.imagem,

            preco:produtoSelecionado.preco,

            quantidade:quantidadeSelecionada,

            observacoes,

            total:

                produtoSelecionado.preco *

                quantidadeSelecionada

        });

    }

    salvarCarrinho(carrinho);

    atualizarCarrinho();

    fecharModal();

    mostrarToast("Produto adicionado ao carrinho!");

}

/*==================================================
ATALHOS
==================================================*/

document.addEventListener("keydown",event=>{

    const modal=document.getElementById("modalProduto");

    if(

        event.key==="Escape"

        &&

        modal.classList.contains("ativo")

    ){

        fecharModal();

    }

});

/*==================================================
LOADING
==================================================*/

function mostrarLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.classList.remove("hide");

    }

}

function esconderLoading(){

    const loading=document.getElementById("loading");

    if(loading){

        loading.classList.add("hide");

    }

}

/*==================================================
RECARREGAR
==================================================*/

function recarregarProdutos(){

    mostrarLoading();

    carregarProdutos();

    esconderLoading();

}

/*==================================================
UTILITÁRIOS
==================================================*/

function formatarMoeda(valor){

    return valor.toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );

}

function limparPesquisa(){

    const pesquisa=document.getElementById("pesquisa");

    if(pesquisa){

        pesquisa.value="";

    }

    produtosFiltrados=[...produtos];

    renderizarProdutos();

}
/*==================================================
INICIALIZAÇÃO DOS EVENTOS
==================================================*/

function configurarEventosModal(){

    const btnMais=document.getElementById("aumentarQtd");

    const btnMenos=document.getElementById("diminuirQtd");

    const btnCarrinho=document.getElementById("btnAdicionarCarrinho");

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

    if(btnCarrinho){

        btnCarrinho.addEventListener(

            "click",

            adicionarAoCarrinho

        );

    }

}

/*==================================================
ATUALIZAÇÃO COMPLETA
==================================================*/

function atualizarPagina(){

    carregarProdutos();

    atualizarCarrinho();

}

/*==================================================
REDEFINIR MODAL
==================================================*/

function limparModal(){

    quantidadeSelecionada=1;

    produtoSelecionado=null;

    const quantidade=document.getElementById("quantidadeProduto");

    const observacoes=document.getElementById("observacoes");

    const total=document.getElementById("totalProduto");

    if(quantidade){

        quantidade.value=1;

    }

    if(observacoes){

        observacoes.value="";

    }

    if(total){

        total.textContent="R$ 0,00";

    }

}

/*==================================================
NOVA FUNÇÃO FECHAR MODAL
==================================================*/

function fecharModal(){

    limparModal();

    const modal=document.getElementById("modalProduto");

    if(modal){

        modal.classList.remove("ativo");

    }

}

/*==================================================
ALTERAÇÃO DA INICIALIZAÇÃO
==================================================*/

function iniciarCardapio(){

    configurarEventosModal();

    carregarProdutos();

    configurarPesquisa();

    configurarCategorias();

    configurarModal();

    atualizarCarrinho();

}

/*==================================================
FIM DO ARQUIVO
CARDAPIO.JS V2.0
==================================================*/