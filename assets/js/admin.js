/*==================================================
EL PRADO OS
ADMIN.JS
VERSÃO 2.0
==================================================*/

let produtos = [];

let produtoEditando = null;

/*==================================================
INICIAR
==================================================*/

document.addEventListener("DOMContentLoaded", iniciarAdmin);

function iniciarAdmin(){

    carregarProdutos();

    atualizarDashboard();

    renderizarProdutos();

    carregarConfiguracoes();

    configurarFormulario();

}

/*==================================================
FORMULÁRIO
==================================================*/

function configurarFormulario(){

    const form = document.getElementById("formProduto");

    if(!form){

        return;

    }

    form.addEventListener("submit", salvarProduto);

}

/*==================================================
CARREGAR PRODUTOS
==================================================*/

function carregarProdutos(){

    produtos = obterProdutos();

}

/*==================================================
SALVAR PRODUTO
==================================================*/

function salvarProduto(event){

    event.preventDefault();

    const produto = {

        id:

            produtoEditando

            ? produtoEditando.id

            : Date.now(),

        nome:

            document.getElementById("nomeProduto").value,

        categoria:

            document.getElementById("categoriaProduto").value,

        descricao:

            document.getElementById("descricaoProduto").value,

        preco:

            Number(

                document.getElementById("precoProduto").value

            ),

        imagem:

            document.getElementById("imagemProduto").value,

        ordem:

            Number(

                document.getElementById("ordemProduto").value

            ),

        ativo:

            document.getElementById("produtoAtivo").checked,

        destaque:

            document.getElementById("produtoDestaque").checked,

        promocao:

            document.getElementById("produtoPromocao").checked,

        maisVendido:

            document.getElementById("produtoMaisVendido").checked,

        lancamento:

            document.getElementById("produtoLancamento").checked

    };

    if(produtoEditando){

        atualizarProduto(produto);

    }else{

        produtos.push(produto);

    }

    salvarProdutos(produtos);

    produtoEditando = null;

    document.getElementById("formProduto").reset();

    document.getElementById("produtoAtivo").checked = true;

    renderizarProdutos();

    atualizarDashboard();

}
/*==================================================
ATUALIZAR PRODUTO
==================================================*/

function atualizarProduto(produtoAtualizado){

    produtos = produtos.map(produto =>

        produto.id === produtoAtualizado.id

            ? produtoAtualizado

            : produto

    );

}

/*==================================================
EDITAR PRODUTO
==================================================*/

function editarProduto(id){

    produtoEditando = produtos.find(

        produto => produto.id === id

    );

    if(!produtoEditando){

        return;

    }

    document.getElementById("nomeProduto").value =
        produtoEditando.nome;

    document.getElementById("categoriaProduto").value =
        produtoEditando.categoria;

    document.getElementById("descricaoProduto").value =
        produtoEditando.descricao;

    document.getElementById("precoProduto").value =
        produtoEditando.preco;

    document.getElementById("imagemProduto").value =
        produtoEditando.imagem;

    document.getElementById("ordemProduto").value =
        produtoEditando.ordem || 1;

    document.getElementById("produtoAtivo").checked =
        produtoEditando.ativo;

    document.getElementById("produtoDestaque").checked =
        produtoEditando.destaque;

    document.getElementById("produtoPromocao").checked =
        produtoEditando.promocao;

    document.getElementById("produtoMaisVendido").checked =
        produtoEditando.maisVendido;

    document.getElementById("produtoLancamento").checked =
        produtoEditando.lancamento;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*==================================================
EXCLUIR PRODUTO
==================================================*/

function excluirProduto(id){

    const confirmar = confirm(

        "Deseja realmente excluir este produto?"

    );

    if(!confirmar){

        return;

    }

    produtos = produtos.filter(

        produto => produto.id !== id

    );

    salvarProdutos(produtos);

    renderizarProdutos();

    atualizarDashboard();

}

/*==================================================
RENDERIZAR PRODUTOS
==================================================*/

function renderizarProdutos(){

    const tbody = document.getElementById("listaProdutos");

    if(!tbody){

        return;

    }

    if(produtos.length === 0){

        tbody.innerHTML = `

<tr>

<td colspan="6">

<div class="sem-registros">

<h3>

Nenhum produto cadastrado

</h3>

<p>

Cadastre o primeiro produto para que ele apareça automaticamente na Home e no Cardápio.

</p>

</div>

</td>

</tr>

`;

        return;

    }

    produtos.sort((a,b)=>

        (a.ordem || 999) - (b.ordem || 999)

    );

    tbody.innerHTML = "";

    produtos.forEach(produto=>{

        tbody.innerHTML += `

<tr>

<td>

<img src="${produto.imagem}" alt="${produto.nome}">

</td>

<td>

<strong>${produto.nome}</strong>

</td>

<td>

${produto.categoria}

</td>

<td>

R$ ${produto.preco.toFixed(2).replace(".",",")}

</td>

<td>

${produto.ativo
? '<span class="badge ativo">Ativo</span>'
: '<span class="badge inativo">Inativo</span>'}

${produto.promocao
? '<span class="badge promocao">Promoção</span>'
: ''}

${produto.destaque
? '<span class="badge destaque">Destaque</span>'
: ''}

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
DASHBOARD
==================================================*/

function atualizarDashboard(){

    atualizarTotalProdutos();

    atualizarTotalPedidos();

    atualizarTotalClientes();

    atualizarFaturamento();

    atualizarFinanceiro();

}

/*==================================================
PRODUTOS
==================================================*/

function atualizarTotalProdutos(){

    const elemento = document.getElementById("totalProdutos");

    if(!elemento){

        return;

    }

    elemento.textContent = produtos.length;

}

/*==================================================
PEDIDOS
==================================================*/

function atualizarTotalPedidos(){

    const elemento = document.getElementById("totalPedidos");

    if(!elemento){

        return;

    }

    const pedidos = obterPedidos();

    elemento.textContent = pedidos.length;

}

/*==================================================
CLIENTES
==================================================*/

function atualizarTotalClientes(){

    const elemento = document.getElementById("totalClientes");

    if(!elemento){

        return;

    }

    const clientes = obterClientes();

    elemento.textContent = clientes.length;

}

/*==================================================
FATURAMENTO
==================================================*/

function atualizarFaturamento(){

    const elemento = document.getElementById("faturamento");

    if(!elemento){

        return;

    }

    const pedidos = obterPedidos();

    let total = 0;

    pedidos.forEach(pedido=>{

        total += Number(pedido.total || 0);

    });

    elemento.textContent =

        total.toLocaleString(

            "pt-BR",

            {

                style:"currency",

                currency:"BRL"

            }

        );

}

/*==================================================
FINANCEIRO
==================================================*/

function atualizarFinanceiro(){

    atualizarReceita();

    atualizarPedidosFinalizados();

    atualizarTicketMedio();

    atualizarProdutoMaisVendido();

}

/*==================================================
RECEITA TOTAL
==================================================*/

function atualizarReceita(){

    const elemento = document.getElementById("receitaTotal");

    if(!elemento){

        return;

    }

    const pedidos = obterPedidos();

    let receita = 0;

    pedidos.forEach(pedido=>{

        receita += Number(pedido.total || 0);

    });

    elemento.textContent =

        receita.toLocaleString(

            "pt-BR",

            {

                style:"currency",

                currency:"BRL"

            }

        );

}

/*==================================================
PEDIDOS FINALIZADOS
==================================================*/

function atualizarPedidosFinalizados(){

    const elemento = document.getElementById("pedidosFinalizados");

    if(!elemento){

        return;

    }

    const pedidos = obterPedidos();

    elemento.textContent = pedidos.filter(

        pedido => pedido.status === "Finalizado"

    ).length;

}
/*==================================================
TICKET MÉDIO
==================================================*/

function atualizarTicketMedio(){

    const elemento = document.getElementById("ticketMedio");

    if(!elemento){

        return;

    }

    const pedidos = obterPedidos();

    if(pedidos.length === 0){

        elemento.textContent = "R$ 0,00";

        return;

    }

    let total = 0;

    pedidos.forEach(pedido=>{

        total += Number(pedido.total || 0);

    });

    const ticket = total / pedidos.length;

    elemento.textContent =

        ticket.toLocaleString(

            "pt-BR",

            {

                style:"currency",

                currency:"BRL"

            }

        );

}

/*==================================================
PRODUTO MAIS VENDIDO
==================================================*/

function atualizarProdutoMaisVendido(){

    const elemento = document.getElementById("produtoMaisVendido");

    if(!elemento){

        return;

    }

    const pedidos = obterPedidos();

    const ranking = {};

    pedidos.forEach(pedido=>{

        if(!pedido.itens){

            return;

        }

        pedido.itens.forEach(item=>{

            if(!ranking[item.nome]){

                ranking[item.nome]=0;

            }

            ranking[item.nome]+=item.quantidade || 1;

        });

    });

    let produto="—";

    let maior=0;

    Object.keys(ranking).forEach(nome=>{

        if(ranking[nome]>maior){

            maior=ranking[nome];

            produto=nome;

        }

    });

    elemento.textContent=produto;

}

/*==================================================
CLIENTES
==================================================*/

function renderizarClientes(){

    const tbody=document.getElementById("listaClientes");

    if(!tbody){

        return;

    }

    const clientes=obterClientes();

    if(clientes.length===0){

        tbody.innerHTML=`

<tr>

<td colspan="5">

<div class="sem-registros">

<h3>Nenhum cliente cadastrado.</h3>

</div>

</td>

</tr>

`;

        return;

    }

    tbody.innerHTML="";

    clientes.forEach(cliente=>{

        tbody.innerHTML+=`

<tr>

<td>${cliente.nome}</td>

<td>${cliente.telefone || "-"}</td>

<td>${cliente.email || "-"}</td>

<td>${cliente.pedidos || 0}</td>

<td>

${Number(cliente.totalGasto || 0).toLocaleString(

"pt-BR",

{

style:"currency",

currency:"BRL"

}

)}

</td>

</tr>

`;

    });

}

/*==================================================
PEDIDOS
==================================================*/

function renderizarPedidos(){

    const tbody=document.getElementById("listaPedidos");

    if(!tbody){

        return;

    }

    const pedidos=obterPedidos();

    if(pedidos.length===0){

        tbody.innerHTML=`

<tr>

<td colspan="6">

<div class="sem-registros">

<h3>Nenhum pedido realizado.</h3>

</div>

</td>

</tr>

`;

        return;

    }

    tbody.innerHTML="";

    pedidos.forEach((pedido,index)=>{

        tbody.innerHTML+=`

<tr>

<td>#${index+1}</td>

<td>${pedido.cliente || "-"}</td>

<td>

${Number(pedido.total || 0).toLocaleString(

"pt-BR",

{

style:"currency",

currency:"BRL"

}

)}

</td>

<td>${pedido.pagamento || "-"}</td>

<td>${pedido.status || "Recebido"}</td>

<td>

<button

class="btn-acao btn-visualizar">

<i class="fa-solid fa-eye"></i>

</button>

</td>

</tr>

`;

    });

}

/*==================================================
CONFIGURAÇÕES
==================================================*/

function carregarConfiguracoes(){

    const config=obterConfiguracoes();

    if(document.getElementById("nomeLoja"))

        document.getElementById("nomeLoja").value=config.nomeLoja || "";

    if(document.getElementById("telefoneLoja"))

        document.getElementById("telefoneLoja").value=config.telefoneLoja || "";

    if(document.getElementById("pixLoja"))

        document.getElementById("pixLoja").value=config.pixLoja || "";

    if(document.getElementById("taxaEntrega"))

        document.getElementById("taxaEntrega").value=config.taxaEntrega || "";

}
/*==================================================
SALVAR CONFIGURAÇÕES
==================================================*/

const formConfiguracoes = document.getElementById("formConfiguracoes");

if(formConfiguracoes){

    formConfiguracoes.addEventListener(

        "submit",

        salvarConfiguracoesLoja

    );

}

function salvarConfiguracoesLoja(event){

    event.preventDefault();

    const configuracoes={

        nomeLoja:

            document.getElementById("nomeLoja").value,

        telefoneLoja:

            document.getElementById("telefoneLoja").value,

        pixLoja:

            document.getElementById("pixLoja").value,

        taxaEntrega:

            Number(

                document.getElementById("taxaEntrega").value

            ) || 0

    };

    salvarConfiguracoes(configuracoes);

    mostrarMensagem(

        "Configurações salvas com sucesso!",

        "success"

    );

}

/*==================================================
MENSAGENS
==================================================*/

function mostrarMensagem(texto,tipo){

    const mensagem=document.createElement("div");

    mensagem.className=`alert alert-${tipo}`;

    mensagem.textContent=texto;

    document.body.appendChild(mensagem);

    mensagem.style.position="fixed";

    mensagem.style.top="20px";

    mensagem.style.right="20px";

    mensagem.style.zIndex="99999";

    setTimeout(()=>{

        mensagem.remove();

    },3000);

}

/*==================================================
ATUALIZAÇÃO GERAL
==================================================*/

function atualizarPainel(){

    carregarProdutos();

    renderizarProdutos();

    renderizarPedidos();

    renderizarClientes();

    atualizarDashboard();

}

/*==================================================
RESET FORMULÁRIO
==================================================*/

function limparFormulario(){

    document.getElementById(

        "formProduto"

    ).reset();

    document.getElementById(

        "produtoAtivo"

    ).checked=true;

    produtoEditando=null;

}

/*==================================================
SOBRESCREVER SALVAR
==================================================*/

const salvarProdutoOriginal=salvarProduto;

salvarProduto=function(event){

    salvarProdutoOriginal(event);

    limparFormulario();

    atualizarPainel();

    mostrarMensagem(

        "Produto salvo com sucesso!",

        "success"

    );

}

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    ()=>{

        atualizarPainel();

    }

);

/*==================================================
VERSÃO

Admin.js 2.0

Fim do Arquivo
==================================================*/