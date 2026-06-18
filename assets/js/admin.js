/*==================================================
EL PRADO CONTROL
ADMIN.JS
VERSÃO 5.0
Autor: Joaquim Prado
==================================================*/

/*==================================================
VARIÁVEIS GLOBAIS
==================================================*/

let produtos = [];
let pedidos = [];
let clientes = [];
let configuracoes = {};

let produtoEditando = null;

/*==================================================
ELEMENTOS
==================================================*/

const tituloPagina =
document.getElementById("tituloPagina");

const modalProduto =
document.getElementById("modalProduto");

const formProduto =
document.getElementById("formProduto");

const previewProduto =
document.getElementById("previewProduto");

const campoImagem =
document.getElementById("imagemProduto");

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(
    "DOMContentLoaded",
    iniciarSistema
);

function iniciarSistema(){

    carregarDados();

    configurarEventos();

    atualizarSistema();

}
/*==================================================
CARREGAR DADOS
==================================================*/

function carregarDados(){

    produtos =
    Storage.getProdutos() || [];

    pedidos =
    Storage.getPedidos() || [];

    clientes =
    Storage.getClientes() || [];

    configuracoes =
    Storage.getConfiguracoes() || {};

    clientes.forEach(cliente=>{

        const listaPedidos =
        pedidos.filter(
            pedido=>pedido.cliente===cliente.nome
        );

        cliente.pedidos =
        listaPedidos.length;

        cliente.totalGasto =
        listaPedidos.reduce(

            (total,pedido)=>

            total+Number(
                pedido.total || 0
            ),

            0

        );

    });

}
/*==================================================
EVENTOS
==================================================*/

function configurarEventos(){

    const btnNovo =
    document.getElementById("btnNovoProduto");

    if(btnNovo){

        btnNovo.onclick =
        abrirNovoProduto;

    }

    const fechar =
    document.getElementById(
        "fecharModalProduto"
    );

    if(fechar){

        fechar.onclick =
        fecharModalProduto;

    }

    const cancelar =
    document.getElementById(
        "cancelarProduto"
    );

    if(cancelar){

        cancelar.onclick =
        fecharModalProduto;

    }

    if(formProduto){

        formProduto.onsubmit =
        salvarProduto;

    }

    if(campoImagem){

        campoImagem.oninput =
        atualizarPreviewImagem;

    }

    document
    .getElementById(
        "pesquisaProduto"
    )
    ?.addEventListener(
        "input",
        renderizarProdutos
    );

    document
    .getElementById(
        "filtroCategoria"
    )
    ?.addEventListener(
        "change",
        renderizarProdutos
    );

    document
    .getElementById(
        "filtroStatusProduto"
    )
    ?.addEventListener(
        "change",
        renderizarProdutos
    );

    document
    .getElementById(
        "pesquisaPedido"
    )
    ?.addEventListener(
        "input",
        renderizarPedidos
    );

    document
    .getElementById(
        "filtroStatus"
    )
    ?.addEventListener(
        "change",
        renderizarPedidos
    );

    document
    .getElementById(
        "pesquisaCliente"
    )
    ?.addEventListener(
        "input",
        renderizarClientes
    );

}
/*==================================================
MODAL PRODUTO
==================================================*/

function abrirNovoProduto(){

    produtoEditando = null;

    if(formProduto){
        formProduto.reset();
    }

    if(previewProduto){
        previewProduto.src =
        "../assets/img/sem-imagem.png";
    }

    document.getElementById(
        "produtoAtivo"
    ).checked = true;

    document.getElementById(
        "ordemProduto"
    ).value = produtos.length + 1;

    modalProduto.classList.add("ativo");

}

function fecharModalProduto(){

    modalProduto.classList.remove("ativo");

}

/*==================================================
PREVIEW DA IMAGEM
==================================================*/

function atualizarPreviewImagem(){

    const url =
    campoImagem.value.trim();

    if(url===""){

        previewProduto.src =
        "../assets/img/sem-imagem.png";

        return;

    }

    previewProduto.src = url;

    previewProduto.onerror = function(){

        previewProduto.src =
        "../assets/img/sem-imagem.png";

    };

}
/*==================================================
SALVAR PRODUTO
==================================================*/

function salvarProduto(event){

    event.preventDefault();

    const produto={

        id:

        produtoEditando ||

        Date.now(),

        nome:

        document.getElementById(
        "nomeProduto"
        ).value.trim(),

        categoria:

        document.getElementById(
        "categoriaProduto"
        ).value,

        descricao:

        document.getElementById(
        "descricaoProduto"
        ).value.trim(),

        preco:Number(

            document.getElementById(
            "precoProduto"
            ).value

        ),

        ordem:Number(

            document.getElementById(
            "ordemProduto"
            ).value

        ),

        imagem:

        document.getElementById(
        "imagemProduto"
        ).value.trim(),

        ativo:

        document.getElementById(
        "produtoAtivo"
        ).checked,

        promocao:

        document.getElementById(
        "produtoPromocao"
        ).checked,

        destaque:

        document.getElementById(
        "produtoDestaque"
        ).checked,

        maisVendido:

        document.getElementById(
        "produtoMaisVendido"
        ).checked,

        lancamento:

        document.getElementById(
        "produtoLancamento"
        ).checked

    };

    if(produtoEditando){

        const indice =
        produtos.findIndex(

            p=>p.id===produtoEditando

        );

        produtos[indice] = produto;

        mostrarAlerta(

            "Produto atualizado!",

            "success"

        );

    }else{

        produtos.push(produto);

        mostrarAlerta(

            "Produto cadastrado!",

            "success"

        );

    }

    produtos.sort(

        (a,b)=>

        a.ordem-b.ordem

    );

    Storage.salvarProdutos(produtos);

    fecharModalProduto();

    atualizarSistema();

}
/*==================================================
ATUALIZAÇÃO GERAL
==================================================*/

function atualizarSistema(){

    carregarDados();

    atualizarPainel();

    renderizarProdutos();

    renderizarPedidos();

    renderizarClientes();

    atualizarFinanceiro();

}
/*==================================================
RENDERIZAR PRODUTOS
==================================================*/

function renderizarProdutos(){

    const tbody =
    document.getElementById("listaProdutos");

    if(!tbody) return;

    let lista = [...produtos];

    const pesquisa =
    document.getElementById("pesquisaProduto")
    ?.value
    .toLowerCase() || "";

    const categoria =
    document.getElementById("filtroCategoria")
    ?.value || "";

    const status =
    document.getElementById("filtroStatusProduto")
    ?.value || "";

    /*==============================
    FILTRO NOME
    ==============================*/

    if(pesquisa){

        lista = lista.filter(produto=>

            produto.nome
            .toLowerCase()
            .includes(pesquisa)

        );

    }

    /*==============================
    FILTRO CATEGORIA
    ==============================*/

    if(categoria){

        lista = lista.filter(

            produto=>

            produto.categoria===categoria

        );

    }

    /*==============================
    FILTRO STATUS
    ==============================*/

    if(status==="ativos"){

        lista = lista.filter(

            produto=>produto.ativo

        );

    }

    if(status==="inativos"){

        lista = lista.filter(

            produto=>!produto.ativo

        );

    }

    /*==============================
    ORDENAÇÃO
    ==============================*/

    lista.sort(

        (a,b)=>a.ordem-b.ordem

    );

    /*==============================
    SEM PRODUTOS
    ==============================*/

    if(lista.length===0){

        tbody.innerHTML=`

<tr>

<td colspan="6">

<div class="sem-registros">

<h3>

Nenhum produto encontrado.

</h3>

<p>

Cadastre um novo produto.

</p>

</div>

</td>

</tr>

`;

        return;

    }

    tbody.innerHTML="";

    lista.forEach(produto=>{

        tbody.innerHTML += `

<tr>

<td>

<img

class="produto-thumb"

src="${

produto.imagem ||

'../assets/img/sem-imagem.png'

}"

alt="${produto.nome}">

</td>

<td>

<strong>

${produto.nome}

</strong>

<br>

<small>

${produto.descricao}

</small>

</td>

<td>

${traduzCategoria(

produto.categoria

)}

</td>

<td>

${formatarMoeda(

produto.preco

)}

</td>

<td>

${gerarBadges(

produto

)}

</td>

<td>

<div class="acoes">

<button

class="btn-acao btn-editar"

onclick="editarProduto(${produto.id})">

<i class="fa-solid fa-pen"></i>

</button>

<button

class="btn-acao btn-excluir"

onclick="excluirProduto(${produto.id})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

</td>

</tr>

`;

    });

}
/*==================================================
EDITAR PRODUTO
==================================================*/

function editarProduto(id){

    const produto = produtos.find(

        p => p.id === id

    );

    if(!produto) return;

    produtoEditando = id;

    document.getElementById(
        "nomeProduto"
    ).value = produto.nome;

    document.getElementById(
        "categoriaProduto"
    ).value = produto.categoria;

    document.getElementById(
        "descricaoProduto"
    ).value = produto.descricao;

    document.getElementById(
        "precoProduto"
    ).value = produto.preco;

    document.getElementById(
        "ordemProduto"
    ).value = produto.ordem;

    document.getElementById(
        "imagemProduto"
    ).value = produto.imagem || "";

    document.getElementById(
        "produtoAtivo"
    ).checked = produto.ativo;

    document.getElementById(
        "produtoPromocao"
    ).checked = produto.promocao;

    document.getElementById(
        "produtoDestaque"
    ).checked = produto.destaque;

    document.getElementById(
        "produtoMaisVendido"
    ).checked = produto.maisVendido;

    document.getElementById(
        "produtoLancamento"
    ).checked = produto.lancamento;

    atualizarPreviewImagem();

    modalProduto.classList.add("ativo");

}

/*==================================================
EXCLUIR PRODUTO
==================================================*/

function excluirProduto(id){

    if(!confirm(
        "Deseja realmente excluir este produto?"
    )) return;

    produtos = produtos.filter(

        produto => produto.id !== id

    );

    produtos.sort(

        (a,b)=>a.ordem-b.ordem

    );

    Storage.salvarProdutos(produtos);

    atualizarSistema();

    mostrarAlerta(

        "Produto removido com sucesso!",

        "warning"

    );

}

/*==================================================
BADGES
==================================================*/

function gerarBadges(produto){

    let html = "";

    html += produto.ativo

    ? '<span class="badge ativo">Ativo</span>'

    : '<span class="badge inativo">Inativo</span>';

    if(produto.promocao){

        html +=
        '<span class="badge promocao">Promoção</span>';

    }

    if(produto.destaque){

        html +=
        '<span class="badge destaque">Destaque</span>';

    }

    if(produto.maisVendido){

        html +=
        '<span class="badge vendido">Mais Vendido</span>';

    }

    if(produto.lancamento){

        html +=
        '<span class="badge lancamento">Lançamento</span>';

    }

    return html;

}

/*==================================================
TRADUZIR CATEGORIA
==================================================*/

function traduzCategoria(categoria){

    const categorias = {

        burger : "Hambúrguer",

        combo : "Combo",

        porcao : "Porção",

        bebida : "Bebida",

        sobremesa : "Sobremesa"

    };

    return categorias[categoria] || categoria;

}
/*==================================================
DASHBOARD
==================================================*/

function atualizarPainel(){

    atualizarCardsDashboard();

    atualizarUltimosPedidos();

    atualizarResumoDashboard();

}

function atualizarCardsDashboard(){

    const totalProdutos =
    document.getElementById("totalProdutos");

    const totalPedidos =
    document.getElementById("totalPedidos");

    const totalClientes =
    document.getElementById("totalClientes");

    const receitaTotal =
    document.getElementById("receitaTotalDashboard");

    if(totalProdutos)
        totalProdutos.textContent = produtos.length;

    if(totalPedidos)
        totalPedidos.textContent = pedidos.length;

    if(totalClientes)
        totalClientes.textContent = clientes.length;

    const receita = pedidos

        .filter(
            pedido=>pedido.status==="Finalizado"
        )

        .reduce(
            (total,pedido)=>
            total+Number(pedido.total||0),
            0
        );

    if(receitaTotal){

        receitaTotal.textContent =
        formatarMoeda(receita);

    }

}
function atualizarUltimosPedidos(){

    const tbody =
    document.getElementById("ultimosPedidos");

    if(!tbody) return;

    if(pedidos.length===0){

        tbody.innerHTML=`

<tr>

<td colspan="4">

Nenhum pedido encontrado.

</td>

</tr>

`;

        return;

    }

    tbody.innerHTML="";

    [...pedidos]

    .sort((a,b)=>b.id-a.id)

    .slice(0,5)

    .forEach(pedido=>{

        tbody.innerHTML+=`

<tr>

<td>#${pedido.id}</td>

<td>${pedido.cliente}</td>

<td>${formatarMoeda(pedido.total)}</td>

<td>

<span class="badge ${classeStatus(pedido.status)}">

${pedido.status}

</span>

</td>

</tr>

`;

    });

}
function atualizarResumoDashboard(){

    const finalizados =

    pedidos.filter(

        pedido=>

        pedido.status==="Finalizado"

    );

    const receita =

    finalizados.reduce(

        (soma,pedido)=>

        soma+Number(pedido.total||0),

        0

    );

    const ticket =

    finalizados.length

    ? receita/finalizados.length

    :0;

    document.getElementById(

        "receitaResumoDashboard"

    ).textContent =

    formatarMoeda(receita);

    document.getElementById(

        "ticketMedioDashboard"

    ).textContent =

    formatarMoeda(ticket);

    document.getElementById(

        "pedidosFinalizadosDashboard"

    ).textContent =

    finalizados.length;

    document.getElementById(

        "produtoMaisVendidoDashboard"

    ).textContent =

    calcularProdutoMaisVendido();

}
/*==================================================
PRODUTO MAIS VENDIDO
==================================================*/

function calcularProdutoMaisVendido(){

    if(!pedidos.length){

        return "—";

    }

    const ranking={};

    pedidos.forEach(pedido=>{

        if(!pedido.itens) return;

        pedido.itens.forEach(item=>{

            ranking[item.nome]=

            (ranking[item.nome]||0)

            +

            Number(item.quantidade||1);

        });

    });

    let maior=0;

    let nome="—";

    Object.entries(ranking)

    .forEach(([produto,total])=>{

        if(total>maior){

            maior=total;

            nome=produto;

        }

    });

    return nome;

}

/*==================================================
STATUS
==================================================*/

function classeStatus(status){

    switch(status){

        case "Recebido":

            return "info";

        case "Em preparo":

            return "warning";

        case "Saiu para entrega":

            return "destaque";

        case "Finalizado":

            return "ativo";

        case "Cancelado":

            return "inativo";

        default:

            return "";

    }

}
/*==================================================
UTILITÁRIOS
==================================================*/

function formatarMoeda(valor){

    return Number(valor||0)

    .toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );

}

function gerarId(){

    return Date.now();

}

function salvarTudo(){

    Storage.salvarProdutos(produtos);

    Storage.salvarPedidos(pedidos);

    Storage.salvarClientes(clientes);

    Storage.salvarConfiguracoes(configuracoes);

}

function mostrarAlerta(

    mensagem,

    tipo="success"

){

    const alerta =

    document.createElement("div");

    alerta.className =

    `alert alert-${tipo}`;

    alerta.textContent =

    mensagem;

    alerta.style.position="fixed";

    alerta.style.top="25px";

    alerta.style.right="25px";

    alerta.style.zIndex="99999";

    document.body.appendChild(alerta);

    setTimeout(()=>{

        alerta.style.opacity="0";

        alerta.style.transition=".3s";

        setTimeout(()=>{

            alerta.remove();

        },300);

    },2500);

}
/*==================================================
PEDIDOS
==================================================*/

function renderizarPedidos(){

    const tbody =
    document.getElementById("listaPedidos");

    if(!tbody) return;

    let lista = [...pedidos];

    const pesquisa =
    document.getElementById("pesquisaPedido")
    ?.value
    .toLowerCase() || "";

    const status =
    document.getElementById("filtroStatus")
    ?.value || "";

    /*==============================
    PESQUISA
    ==============================*/

    if(pesquisa){

        lista = lista.filter(pedido=>

            (pedido.cliente||"")

            .toLowerCase()

            .includes(pesquisa)

        );

    }

    /*==============================
    STATUS
    ==============================*/

    if(status){

        lista = lista.filter(

            pedido=>

            pedido.status===status

        );

    }

    lista.sort(

        (a,b)=>b.id-a.id

    );

    /*==============================
    SEM PEDIDOS
    ==============================*/

    if(lista.length===0){

        tbody.innerHTML=`

<tr>

<td colspan="6">

<div class="sem-registros">

<h3>

Nenhum pedido encontrado.

</h3>

</div>

</td>

</tr>

`;

        return;

    }

    tbody.innerHTML="";

    lista.forEach(pedido=>{

        tbody.innerHTML += `

<tr>

<td>

#${pedido.id}

</td>

<td>

<strong>

${pedido.cliente}

</strong>

<br>

<small>

${pedido.telefone||"-"}

</small>

</td>

<td>

${formatarMoeda(pedido.total)}

</td>

<td>

${pedido.pagamento||"-"}

</td>

<td>

<select

class="status-select"

onchange="alterarStatusPedido(${pedido.id},this.value)"

>

${gerarOpcoesStatus(pedido.status)}

</select>

</td>

<td>

<div class="acoes">

<button

class="btn-acao btn-visualizar"

onclick="visualizarPedido(${pedido.id})">

<i class="fa-solid fa-eye"></i>

</button>

</div>

</td>

</tr>

`;

    });

}
/*==================================================
ALTERAR STATUS
==================================================*/

function alterarStatusPedido(id,status){

    const pedido = pedidos.find(

        pedido=>pedido.id===id

    );

    if(!pedido) return;

    pedido.status = status;

    Storage.salvarPedidos(pedidos);

    atualizarSistema();

    mostrarAlerta(

        "Status atualizado com sucesso!",

        "success"

    );

}
/*==================================================
OPÇÕES STATUS
==================================================*/

function gerarOpcoesStatus(statusAtual){

    const lista=[

        "Recebido",

        "Em preparo",

        "Saiu para entrega",

        "Finalizado",

        "Cancelado"

    ];

    return lista.map(status=>`

<option

value="${status}"

${status===statusAtual?"selected":""}

>

${status}

</option>

`).join("");

}
/*==================================================
VISUALIZAR PEDIDO
==================================================*/

function visualizarPedido(id){

    const pedido = pedidos.find(

        pedido=>pedido.id===id

    );

    if(!pedido) return;

    let itens="";

    if(pedido.itens){

        pedido.itens.forEach(item=>{

            itens +=

`${item.quantidade}x ${item.nome}\n`;

        });

    }

    alert(

`Pedido #${pedido.id}

Cliente:
${pedido.cliente}

Telefone:
${pedido.telefone||"-"}

Pagamento:
${pedido.pagamento||"-"}

Status:
${pedido.status}

Itens:

${itens}

Total:
${formatarMoeda(pedido.total)}`

    );

}
/*==================================================
CLIENTES
==================================================*/

function renderizarClientes(){

    const tbody =
    document.getElementById("listaClientes");

    if(!tbody) return;

    let lista = [...clientes];

    const pesquisa =
    document.getElementById("pesquisaCliente")
    ?.value
    .toLowerCase() || "";

    if(pesquisa){

        lista = lista.filter(cliente=>

            (cliente.nome || "")

            .toLowerCase()

            .includes(pesquisa)

        );

    }

    lista.sort((a,b)=>

        a.nome.localeCompare(b.nome)

    );

    if(lista.length===0){

        tbody.innerHTML=`

<tr>

<td colspan="5">

<div class="sem-registros">

<h3>

Nenhum cliente encontrado.

</h3>

<p>

Os clientes aparecerão automaticamente
após o primeiro pedido.

</p>

</div>

</td>

</tr>

`;

        return;

    }

    tbody.innerHTML="";

    lista.forEach(cliente=>{

        tbody.innerHTML += `

<tr>

<td>

${cliente.nome}

</td>

<td>

${cliente.telefone || "-"}

</td>

<td>

${cliente.email || "-"}

</td>

<td>

${cliente.pedidos || 0}

</td>

<td>

${formatarMoeda(

cliente.totalGasto

)}

</td>

</tr>

`;

    });

}
/*==================================================
FINANCEIRO
==================================================*/

function atualizarFinanceiro(){

    const pedidosFinalizados =

    pedidos.filter(

        pedido=>

        pedido.status==="Finalizado"

    );

    const receita =

    pedidosFinalizados.reduce(

        (total,pedido)=>

        total+Number(

            pedido.total || 0

        ),

        0

    );

    const ticket =

    pedidosFinalizados.length

    ?

    receita /

    pedidosFinalizados.length

    :

    0;

    const receitaEl =
    document.getElementById(
    "financeiroReceitaTotal"
    );

    const ticketEl =
    document.getElementById(
    "financeiroTicketMedio"
    );

    const pedidosEl =
    document.getElementById(
    "financeiroPedidosFinalizados"
    );

    const vendidoEl =
    document.getElementById(
    "financeiroProdutoMaisVendido"
    );

    if(receitaEl){

        receitaEl.textContent =

        formatarMoeda(receita);

    }

    if(ticketEl){

        ticketEl.textContent =

        formatarMoeda(ticket);

    }

    if(pedidosEl){

        pedidosEl.textContent =

        pedidosFinalizados.length;

    }

    if(vendidoEl){

        vendidoEl.textContent =

        calcularProdutoMaisVendido();

    }

}
/*==================================================
CONFIGURAÇÕES
==================================================*/

function carregarConfiguracoes(){

    if(!configuracoes){

        configuracoes = {};

    }

    const campos = {

        nomeLoja: "nome",

        telefoneLoja: "telefone",

        pixLoja: "pix",

        taxaEntrega: "taxaEntrega",

        enderecoLoja: "endereco",

        horarioLoja: "horario",

        tempoEntrega: "tempoEntrega"

    };

    Object.entries(campos).forEach(([id,chave])=>{

        const elemento =
        document.getElementById(id);

        if(elemento){

            elemento.value =
            configuracoes[chave] || "";

        }

    });

}
/*==================================================
SALVAR CONFIGURAÇÕES
==================================================*/

const formConfiguracoes =
document.getElementById("formConfiguracoes");

if(formConfiguracoes){

    formConfiguracoes.addEventListener(

        "submit",

        salvarConfiguracoes

    );

}

function salvarConfiguracoes(event){

    event.preventDefault();

    configuracoes = {

        nome:

        document.getElementById(
        "nomeLoja"
        ).value,

        telefone:

        document.getElementById(
        "telefoneLoja"
        ).value,

        pix:

        document.getElementById(
        "pixLoja"
        ).value,

        taxaEntrega:Number(

            document.getElementById(
            "taxaEntrega"
            ).value

        ),

        endereco:

        document.getElementById(
        "enderecoLoja"
        ).value,

        horario:

        document.getElementById(
        "horarioLoja"
        ).value,

        tempoEntrega:

        document.getElementById(
        "tempoEntrega"
        ).value

    };

    Storage.salvarConfiguracoes(

        configuracoes

    );

    mostrarAlerta(

        "Configurações salvas com sucesso!",

        "success"

    );

}
/*==================================================
ATUALIZAÇÃO GERAL
==================================================*/

function atualizarSistema(){

    carregarDados();

    atualizarPainel();

    renderizarProdutos();

    renderizarPedidos();

    renderizarClientes();

    atualizarFinanceiro();

}

/*==================================================
FIM DO ADMIN.JS V5
==================================================*/


