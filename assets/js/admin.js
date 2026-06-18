/*==================================================
EL PRADO OS
ADMIN.JS
VERSÃO 6.0
Responsável pelas regras de negócio
==================================================*/

"use strict";

/*==================================================
ESTADO DA APLICAÇÃO
==================================================*/

const Admin = {

    produtos: [],

    pedidos: [],

    clientes: [],

    configuracoes: {},

    produtoEditando: null

};

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

    Admin.produtos =
    Storage.getProdutos() || [];

    Admin.pedidos =
    Storage.getPedidos() || [];

    Admin.clientes =
    Storage.getClientes() || [];

    Admin.configuracoes =
    Storage.getConfiguracoes() || {};

}

/*==================================================
ATUALIZAÇÃO GERAL
==================================================*/

function atualizarSistema(){

    carregarDados();

    atualizarDashboard();

    renderizarProdutos();

    renderizarPedidos();

    renderizarClientes();

    atualizarFinanceiro();

    carregarConfiguracoes();

}
/*==================================================
DASHBOARD
==================================================*/

function atualizarDashboard(){

    atualizarCardsDashboard();

    atualizarUltimosPedidos();

    atualizarResumoDashboard();

}

/*==================================================
CARDS
==================================================*/

function atualizarCardsDashboard(){

    atualizarCard(

        "totalProdutos",

        Admin.produtos.length

    );

    atualizarCard(

        "totalPedidos",

        Admin.pedidos.length

    );

    atualizarCard(

        "totalClientes",

        Admin.clientes.length

    );

    const receita =

        Admin.pedidos

        .filter(

            pedido=>pedido.status==="Finalizado"

        )

        .reduce(

            (total,pedido)=>

            total +

            Number(

                pedido.total || 0

            ),

            0

        );

    atualizarCard(

        "receitaTotalDashboard",

        formatarMoeda(receita)

    );

}

/*==================================================
ÚLTIMOS PEDIDOS
==================================================*/

function atualizarUltimosPedidos(){

    const tbody =

    document.getElementById(

        "ultimosPedidos"

    );

    if(!tbody){

        return;

    }

    if(Admin.pedidos.length===0){

        tbody.innerHTML = `

<tr>

<td colspan="4">

Nenhum pedido encontrado.

</td>

</tr>

`;

        return;

    }

    tbody.innerHTML = "";

    [...Admin.pedidos]

    .sort(

        (a,b)=>b.id-a.id

    )

    .slice(0,5)

    .forEach(pedido=>{

        tbody.innerHTML += `

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

/*==================================================
RESUMO
==================================================*/

function atualizarResumoDashboard(){

    const finalizados =

    Admin.pedidos.filter(

        pedido=>

        pedido.status==="Finalizado"

    );

    const receita =

        finalizados.reduce(

            (total,pedido)=>

            total +

            Number(

                pedido.total || 0

            ),

            0

        );

    const ticket =

        finalizados.length

        ?

        receita /

        finalizados.length

        :

        0;

    atualizarCard(

        "receitaResumoDashboard",

        formatarMoeda(receita)

    );

    atualizarCard(

        "ticketMedioDashboard",

        formatarMoeda(ticket)

    );

    atualizarCard(

        "pedidosFinalizadosDashboard",

        finalizados.length

    );

    atualizarCard(

        "produtoMaisVendidoDashboard",

        calcularProdutoMaisVendido()

    );

}

/*==================================================
CARD GENÉRICO
==================================================*/

function atualizarCard(id,valor){

    const elemento =

    document.getElementById(id);

    if(!elemento){

        return;

    }

    elemento.textContent = valor;

}

/*==================================================
PRODUTO MAIS VENDIDO
==================================================*/

function calcularProdutoMaisVendido(){

    if(!Admin.pedidos.length){

        return "—";

    }

    const ranking = {};

    Admin.pedidos.forEach(pedido=>{

        if(!pedido.itens){

            return;

        }

        pedido.itens.forEach(item=>{

            ranking[item.nome] =

            (ranking[item.nome] || 0)

            +

            Number(

                item.quantidade || 1

            );

        });

    });

    let maior = 0;

    let produto = "—";

    Object.entries(ranking)

    .forEach(([nome,total])=>{

        if(total>maior){

            maior = total;

            produto = nome;

        }

    });

    return produto;

}
/*==================================================
PRODUTOS
CONFIGURAÇÃO DOS EVENTOS
==================================================*/

function configurarEventos(){

    document

        .getElementById("btnNovoProduto")

        ?.addEventListener(

            "click",

            abrirNovoProduto

        );

    document

        .getElementById("formProduto")

        ?.addEventListener(

            "submit",

            salvarProduto

        );

    document

        .getElementById("fecharModalProduto")

        ?.addEventListener(

            "click",

            fecharModalProduto

        );

    document

        .getElementById("cancelarProduto")

        ?.addEventListener(

            "click",

            fecharModalProduto

        );

    document

        .getElementById("imagemProduto")

        ?.addEventListener(

            "input",

            atualizarPreviewImagem

        );

    document

        .getElementById("pesquisaProduto")

        ?.addEventListener(

            "input",

            renderizarProdutos

        );

    document

        .getElementById("filtroCategoria")

        ?.addEventListener(

            "change",

            renderizarProdutos

        );

    document

        .getElementById("filtroStatusProduto")

        ?.addEventListener(

            "change",

            renderizarProdutos

        );

}

/*==================================================
NOVO PRODUTO
==================================================*/

function abrirNovoProduto(){

    Admin.produtoEditando = null;

    document

        .getElementById("formProduto")

        ?.reset();

    document

        .getElementById("produtoAtivo")

        .checked = true;

    document

        .getElementById("ordemProduto")

        .value =

        Admin.produtos.length + 1;

    document

        .getElementById("previewProduto")

        .src =

        "../assets/img/sem-imagem.png";

    document

        .getElementById("modalProduto")

        .classList.add("ativo");

}

/*==================================================
FECHAR MODAL
==================================================*/

function fecharModalProduto(){

    document

        .getElementById("modalProduto")

        ?.classList.remove("ativo");

}

/*==================================================
PREVIEW DA IMAGEM
==================================================*/

function atualizarPreviewImagem(){

    const campo =

        document.getElementById(

            "imagemProduto"

        );

    const preview =

        document.getElementById(

            "previewProduto"

        );

    if(!campo || !preview){

        return;

    }

    const url = campo.value.trim();

    preview.src =

        url ||

        "../assets/img/sem-imagem.png";

    preview.onerror = ()=>{

        preview.src =

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

        Admin.produtoEditando

        ||

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

    if(Admin.produtoEditando){

        const indice =

        Admin.produtos.findIndex(

            p=>p.id===produto.id

        );

        Admin.produtos[indice]=produto;

    }

    else{

        Admin.produtos.push(produto);

    }

    Admin.produtos.sort(

        (a,b)=>

        a.ordem-b.ordem

    );

    Storage.salvarProdutos(

        Admin.produtos

    );

    fecharModalProduto();

    atualizarSistema();

    mostrarAlerta(

        "Produto salvo com sucesso."

    );

}
/*==================================================
RENDERIZAR PRODUTOS
==================================================*/

function renderizarProdutos(){

    const tbody =
    document.getElementById("listaProdutos");

    if(!tbody){

        return;

    }

    let lista = [...Admin.produtos];

    const pesquisa =
    document.getElementById("pesquisaProduto")
    ?.value
    .toLowerCase()
    .trim() || "";

    const categoria =
    document.getElementById("filtroCategoria")
    ?.value || "";

    const status =
    document.getElementById("filtroStatusProduto")
    ?.value || "";

    if(pesquisa){

        lista = lista.filter(produto=>

            produto.nome
            .toLowerCase()
            .includes(pesquisa)

            ||

            produto.descricao
            .toLowerCase()
            .includes(pesquisa)

        );

    }

    if(categoria){

        lista = lista.filter(

            produto=>

            produto.categoria===categoria

        );

    }

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

    lista.sort(

        (a,b)=>a.ordem-b.ordem

    );

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

src="${produto.imagem || "../assets/img/sem-imagem.png"}"

alt="${produto.nome}">

</td>

<td>

<strong>${produto.nome}</strong>

<br>

<small>${produto.descricao}</small>

</td>

<td>

${traduzCategoria(produto.categoria)}

</td>

<td>

${formatarMoeda(produto.preco)}

</td>

<td>

${gerarBadges(produto)}

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

    const produto =

    Admin.produtos.find(

        produto=>produto.id===id

    );

    if(!produto){

        return;

    }

    Admin.produtoEditando = produto.id;

    document.getElementById("nomeProduto").value = produto.nome;
    document.getElementById("categoriaProduto").value = produto.categoria;
    document.getElementById("descricaoProduto").value = produto.descricao;
    document.getElementById("precoProduto").value = produto.preco;
    document.getElementById("ordemProduto").value = produto.ordem;
    document.getElementById("imagemProduto").value = produto.imagem || "";

    document.getElementById("produtoAtivo").checked = produto.ativo;
    document.getElementById("produtoPromocao").checked = produto.promocao;
    document.getElementById("produtoDestaque").checked = produto.destaque;
    document.getElementById("produtoMaisVendido").checked = produto.maisVendido;
    document.getElementById("produtoLancamento").checked = produto.lancamento;

    atualizarPreviewImagem();

    document
    .getElementById("modalProduto")
    .classList.add("ativo");

}

/*==================================================
EXCLUIR PRODUTO
==================================================*/

function excluirProduto(id){

    if(

        !confirm(

            "Deseja realmente excluir este produto?"

        )

    ){

        return;

    }

    Admin.produtos =

    Admin.produtos.filter(

        produto=>produto.id!==id

    );

    Storage.salvarProdutos(

        Admin.produtos

    );

    atualizarSistema();

    mostrarAlerta(

        "Produto removido com sucesso.",

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

        '<span class="badge lancamento">Novo</span>';

    }

    return html;

}

/*==================================================
TRADUZIR CATEGORIA
==================================================*/

function traduzCategoria(categoria){

    const categorias={

        burger:"Hambúrguer",

        combo:"Combo",

        porcao:"Porção",

        bebida:"Bebida",

        sobremesa:"Sobremesa"

    };

    return categorias[categoria] || categoria;

}

/*==================================================
API PRODUTOS
==================================================*/

window.editarProduto = editarProduto;

window.excluirProduto = excluirProduto;
/*==================================================
PEDIDOS
==================================================*/

function renderizarPedidos(){

    const tbody =
    document.getElementById("listaPedidos");

    if(!tbody){

        return;

    }

    let lista = [...Admin.pedidos];

    const pesquisa =
    document.getElementById("pesquisaPedido")
    ?.value
    .toLowerCase()
    .trim() || "";

    const status =
    document.getElementById("filtroStatus")
    ?.value || "";

    if(pesquisa){

        lista = lista.filter(pedido=>

            (pedido.cliente || "")
            .toLowerCase()
            .includes(pesquisa)

            ||

            (pedido.telefone || "")
            .includes(pesquisa)

        );

    }

    if(status){

        lista = lista.filter(

            pedido=>

            pedido.status===status

        );

    }

    lista.sort(

        (a,b)=>b.id-a.id

    );

    if(lista.length===0){

        tbody.innerHTML = `

<tr>

<td colspan="6">

<div class="sem-registros">

<h3>Nenhum pedido encontrado.</h3>

</div>

</td>

</tr>

`;

        return;

    }

    tbody.innerHTML = "";

    lista.forEach(pedido=>{

        tbody.innerHTML += `

<tr>

<td>#${pedido.id}</td>

<td>

<strong>${pedido.cliente}</strong>

<br>

<small>${pedido.telefone || "-"}</small>

</td>

<td>${formatarMoeda(pedido.total)}</td>

<td>${pedido.pagamento || "-"}</td>

<td>

<select

class="status-select"

onchange="alterarStatusPedido(${pedido.id},this.value)"

>

${gerarOpcoesStatus(pedido.status)}

</select>

</td>

<td>

<button

class="btn-acao btn-visualizar"

onclick="visualizarPedido(${pedido.id})">

<i class="fa-solid fa-eye"></i>

</button>

</td>

</tr>

`;

    });

}

/*==================================================
ALTERAR STATUS
==================================================*/

function alterarStatusPedido(id,status){

    const pedido =

    Admin.pedidos.find(

        pedido=>pedido.id===id

    );

    if(!pedido){

        return;

    }

    pedido.status = status;

    Storage.salvarPedidos(

        Admin.pedidos

    );

    atualizarDashboard();

    atualizarFinanceiro();

    mostrarAlerta(

        "Status atualizado com sucesso."

    );

}

/*==================================================
STATUS
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

    const pedido =

    Admin.pedidos.find(

        pedido=>pedido.id===id

    );

    if(!pedido){

        return;

    }

    let itens = "";

    (pedido.itens || []).forEach(item=>{

        itens +=

`${item.quantidade}x ${item.nome}

${formatarMoeda(item.subtotal || (item.precoUnitario * item.quantidade))}

`;

    });

    alert(

`PEDIDO #${pedido.id}

Cliente:
${pedido.cliente}

Telefone:
${pedido.telefone}

Pagamento:
${pedido.pagamento}

Entrega:
${pedido.entrega}

Status:
${pedido.status}

-------------------------

${itens}

-------------------------

TOTAL:
${formatarMoeda(pedido.total)}

Observações:
${pedido.observacoes || "Nenhuma"}`

    );

}

/*==================================================
API
==================================================*/

window.visualizarPedido =
visualizarPedido;

window.alterarStatusPedido =
alterarStatusPedido;
/*==================================================
CLIENTES
==================================================*/

function renderizarClientes(){

    const tbody =
    document.getElementById("listaClientes");

    if(!tbody){

        return;

    }

    let lista = [...Admin.clientes];

    const pesquisa =

    document.getElementById(

        "pesquisaCliente"

    )?.value

    .toLowerCase()

    .trim() || "";

    if(pesquisa){

        lista = lista.filter(cliente=>

            (cliente.nome || "")

            .toLowerCase()

            .includes(pesquisa)

            ||

            (cliente.telefone || "")

            .includes(pesquisa)

            ||

            (cliente.email || "")

            .toLowerCase()

            .includes(pesquisa)

        );

    }

    lista.sort(

        (a,b)=>

        a.nome.localeCompare(b.nome)

    );

    if(lista.length===0){

        tbody.innerHTML = `

<tr>

<td colspan="7">

<div class="sem-registros">

<h3>

Nenhum cliente encontrado.

</h3>

<p>

Os clientes aparecerão automaticamente após o primeiro pedido.

</p>

</div>

</td>

</tr>

`;

        return;

    }

    tbody.innerHTML = "";

    lista.forEach(cliente=>{

        tbody.innerHTML += `

<tr>

<td>

<strong>${cliente.nome}</strong>

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

${formatarMoeda(cliente.totalGasto || 0)}

</td>

<td>

${formatarMoeda(cliente.ticketMedio || 0)}

</td>

<td>

<button

class="btn-acao btn-visualizar"

onclick="visualizarCliente(${cliente.id})">

<i class="fa-solid fa-user"></i>

</button>

</td>

</tr>

`;

    });

}

/*==================================================
VISUALIZAR CLIENTE
==================================================*/

function visualizarCliente(id){

    const cliente =

    Admin.clientes.find(

        cliente=>cliente.id===id

    );

    if(!cliente){

        return;

    }

    const pedidos =

    Admin.pedidos.filter(

        pedido=>

        pedido.clienteId===cliente.id

    );

    let historico = "";

    pedidos.forEach(pedido=>{

        historico +=

`#${pedido.id}

${pedido.data}

${pedido.status}

${formatarMoeda(pedido.total)}

-------------------

`;

    });

    if(historico===""){

        historico =

        "Nenhum pedido encontrado.";

    }

    alert(

`CLIENTE

Nome:
${cliente.nome}

Telefone:
${cliente.telefone}

Email:
${cliente.email || "-"}

Pedidos:
${cliente.pedidos}

Total gasto:
${formatarMoeda(cliente.totalGasto)}

Ticket médio:
${formatarMoeda(cliente.ticketMedio)}

Último pedido:
${cliente.ultimoPedido || "-"}

==================

HISTÓRICO

${historico}`

    );

}

/*==================================================
ATUALIZAR CLIENTES
==================================================*/

function atualizarClientes(){

    Admin.clientes =

    Storage.getClientes();

    renderizarClientes();

}

/*==================================================
API
==================================================*/

window.visualizarCliente =
visualizarCliente;
/*==================================================
FINANCEIRO
==================================================*/

function atualizarFinanceiro(){

    const pedidosFinalizados =

    Admin.pedidos.filter(

        pedido =>

        pedido.status === "Finalizado"

    );

    const receita =

    pedidosFinalizados.reduce(

        (total,pedido)=>

        total + Number(

            pedido.total || 0

        ),

        0

    );

    const ticketMedio =

    pedidosFinalizados.length

    ?

    receita /

    pedidosFinalizados.length

    :

    0;

    atualizarCard(

        "financeiroReceitaTotal",

        formatarMoeda(receita)

    );

    atualizarCard(

        "financeiroTicketMedio",

        formatarMoeda(ticketMedio)

    );

    atualizarCard(

        "financeiroPedidosFinalizados",

        pedidosFinalizados.length

    );

    atualizarCard(

        "financeiroProdutoMaisVendido",

        calcularProdutoMaisVendido()

    );

    atualizarCard(

        "financeiroClientes",

        Admin.clientes.length

    );

}

/*==================================================
RELATÓRIO FINANCEIRO
==================================================*/

function gerarRelatorioFinanceiro(){

    const pedidos =

    Admin.pedidos.filter(

        pedido=>

        pedido.status==="Finalizado"

    );

    const receita = pedidos.reduce(

        (total,pedido)=>

        total +

        Number(

            pedido.total || 0

        ),

        0

    );

    const ticket =

        pedidos.length

        ?

        receita /

        pedidos.length

        :

        0;

    alert(

`RELATÓRIO FINANCEIRO

Pedidos Finalizados:

${pedidos.length}

Receita Total:

${formatarMoeda(receita)}

Ticket Médio:

${formatarMoeda(ticket)}

Clientes:

${Admin.clientes.length}

Produto Mais Vendido:

${calcularProdutoMaisVendido()}`

    );

}

/*==================================================
EXPORTAR FINANCEIRO
==================================================*/

function exportarFinanceiro(){

    const dados = {

        data:

        new Date().toLocaleString(

            "pt-BR"

        ),

        receita:

        Admin.pedidos

        .filter(

            pedido=>

            pedido.status==="Finalizado"

        )

        .reduce(

            (t,p)=>

            t+Number(

                p.total || 0

            ),

            0

        ),

        pedidos:

        Admin.pedidos.length,

        clientes:

        Admin.clientes.length

    };

    const blob = new Blob(

        [

            JSON.stringify(

                dados,

                null,

                4

            )

        ],

        {

            type:

            "application/json"

        }

    );

    const url =

    URL.createObjectURL(blob);

    const a =

    document.createElement("a");

    a.href = url;

    a.download =

    "financeiro-el-prado.json";

    a.click();

    URL.revokeObjectURL(url);

}

/*==================================================
API
==================================================*/

window.gerarRelatorioFinanceiro =
gerarRelatorioFinanceiro;

window.exportarFinanceiro =
exportarFinanceiro;
/*==================================================
CONFIGURAÇÕES
==================================================*/

function carregarConfiguracoes(){

    Admin.configuracoes =

    Storage.getConfiguracoes() || {};

    preencherConfiguracoes();

}

/*==================================================
PREENCHER FORMULÁRIO
==================================================*/

function preencherConfiguracoes(){

    const config = Admin.configuracoes;

    definirValor("nomeLoja", config.nome);
    definirValor("telefoneLoja", config.telefone);
    definirValor("pixLoja", config.pix);
    definirValor("taxaEntrega", config.taxaEntrega);
    definirValor("enderecoLoja", config.endereco);
    definirValor("horarioLoja", config.horario);
    definirValor("tempoEntrega", config.tempoEntrega);

}

/*==================================================
CONFIGURAR EVENTOS
==================================================*/

function configurarEventosConfiguracoes(){

    const form =

    document.getElementById(

        "formConfiguracoes"

    );

    if(!form){

        return;

    }

    form.addEventListener(

        "submit",

        salvarConfiguracoes

    );

}

/*==================================================
SALVAR
==================================================*/

function salvarConfiguracoes(event){

    event.preventDefault();

    Admin.configuracoes = {

        nome:

        obterValor("nomeLoja"),

        telefone:

        obterValor("telefoneLoja"),

        pix:

        obterValor("pixLoja"),

        taxaEntrega:

        Number(

            obterValor("taxaEntrega")

        ) || 0,

        endereco:

        obterValor("enderecoLoja"),

        horario:

        obterValor("horarioLoja"),

        tempoEntrega:

        obterValor("tempoEntrega")

    };

    Storage.salvarConfiguracoes(

        Admin.configuracoes

    );

    mostrarAlerta(

        "Configurações salvas com sucesso."

    );

}

/*==================================================
UTILITÁRIOS CONFIGURAÇÕES
==================================================*/

function obterValor(id){

    return document

    .getElementById(id)

    ?.value

    .trim() || "";

}

function definirValor(id,valor){

    const campo =

    document.getElementById(id);

    if(campo){

        campo.value = valor || "";

    }

}

/*==================================================
RESETAR CONFIGURAÇÕES
==================================================*/

function restaurarConfiguracoesPadrao(){

    if(

        !confirm(

            "Deseja restaurar as configurações padrão?"

        )

    ){

        return;

    }

    Admin.configuracoes = {

        nome:"El Prado Burguer",

        telefone:"",

        pix:"",

        taxaEntrega:0,

        endereco:"",

        horario:"",

        tempoEntrega:"40-60 min"

    };

    Storage.salvarConfiguracoes(

        Admin.configuracoes

    );

    preencherConfiguracoes();

    mostrarAlerta(

        "Configurações restauradas."

    );

}

/*==================================================
API
==================================================*/

window.restaurarConfiguracoesPadrao =
restaurarConfiguracoesPadrao;
/*==================================================
UTILITÁRIOS
==================================================*/

function formatarMoeda(valor){

    return Number(valor || 0).toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );

}

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

function mostrarAlerta(

    mensagem,

    tipo="success"

){

    const alerta =

    document.createElement("div");

    alerta.className =

    `alert alert-${tipo}`;

    alerta.textContent = mensagem;

    alerta.style.position = "fixed";
    alerta.style.top = "20px";
    alerta.style.right = "20px";
    alerta.style.zIndex = "999999";

    document.body.appendChild(alerta);

    setTimeout(()=>{

        alerta.style.opacity = "0";

        alerta.style.transition = ".3s";

        setTimeout(()=>{

            alerta.remove();

        },300);

    },2500);

}

/*==================================================
ATUALIZAÇÃO GERAL
==================================================*/

function atualizarSistema(){

    carregarDados();

    atualizarDashboard();

    renderizarProdutos();

    renderizarPedidos();

    renderizarClientes();

    atualizarFinanceiro();

    carregarConfiguracoes();

}

/*==================================================
SALVAR TUDO
==================================================*/

function salvarTudo(){

    Storage.salvarProdutos(

        Admin.produtos

    );

    Storage.salvarPedidos(

        Admin.pedidos

    );

    Storage.salvarClientes(

        Admin.clientes

    );

    Storage.salvarConfiguracoes(

        Admin.configuracoes

    );

}

/*==================================================
SINCRONIZAÇÃO ENTRE ABAS
==================================================*/

window.addEventListener(

    "storage",

    ()=>{

        atualizarSistema();

    }

);

/*==================================================
API GLOBAL
==================================================*/

window.Admin = Admin;

window.salvarTudo = salvarTudo;

window.atualizarSistema = atualizarSistema;

window.atualizarDashboard = atualizarDashboard;

window.renderizarProdutos = renderizarProdutos;

window.renderizarPedidos = renderizarPedidos;

window.renderizarClientes = renderizarClientes;

window.atualizarFinanceiro = atualizarFinanceiro;

/*==================================================
LOG
==================================================*/

console.log(

    "%cEL PRADO CONTROL",

    "color:#D4AF37;font-size:18px;font-weight:bold"

);

console.log(

    "Admin carregado com sucesso."

);

/*==================================================
FIM DO ADMIN.JS
VERSÃO 6.0
==================================================*/