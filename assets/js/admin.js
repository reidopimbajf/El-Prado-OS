/*==================================================
EL PRADO OS
ADMIN.JS
VERSÃO 3.0
==================================================*/

/*==================================================
ESTADO DA APLICAÇÃO
==================================================*/

const Admin = {

    produtos: [],

    produtoEditando: null

};

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarAdmin

);

function iniciarAdmin(){

    carregarProdutos();

    configurarFormulario();

    carregarConfiguracoes();

    atualizarPainel();

}

/*==================================================
CARREGAR PRODUTOS
==================================================*/

function carregarProdutos(){

    Admin.produtos = obterProdutos();

    Admin.produtos.sort(

        (a,b)=>

        (a.ordem || 999)

        -

        (b.ordem || 999)

    );

}

/*==================================================
FORMULÁRIO
==================================================*/

function configurarFormulario(){

    const form = document.getElementById(

        "formProduto"

    );

    if(form){

        form.addEventListener(

            "submit",

            salvarProduto

        );

    }

    const formConfiguracoes =

        document.getElementById(

            "formConfiguracoes"

        );

    if(formConfiguracoes){

        formConfiguracoes.addEventListener(

            "submit",

            salvarConfiguracoesLoja

        );

    }

}
/*==================================================
CADASTRO DE PRODUTOS
==================================================*/

function salvarProduto(event){

    event.preventDefault();

    const produto = obterDadosFormulario();

    if(Admin.produtoEditando){

        atualizarProduto(produto);

        mostrarMensagem(

            "Produto atualizado com sucesso!",

            "success"

        );

    }else{

        Admin.produtos.push(produto);

        mostrarMensagem(

            "Produto cadastrado com sucesso!",

            "success"

        );

    }

    salvarProdutos(Admin.produtos);

    limparFormulario();

    atualizarPainel();

}

/*==================================================
OBTER DADOS DO FORMULÁRIO
==================================================*/

function obterDadosFormulario(){

    return{

        id:

            Admin.produtoEditando

            ?

            Admin.produtoEditando.id

            :

            Date.now(),

        nome:

            document.getElementById("nomeProduto").value.trim(),

        categoria:

            document.getElementById("categoriaProduto").value,

        descricao:

            document.getElementById("descricaoProduto").value.trim(),

        preco:

            Number(

                document.getElementById("precoProduto").value

            ),

        imagem:

            document.getElementById("imagemProduto").value.trim(),

        ordem:

            Number(

                document.getElementById("ordemProduto").value

            ) || 999,

        ativo:

            document.getElementById("produtoAtivo").checked,

        destaque:

            document.getElementById("produtoDestaque").checked,

        promocao:

            document.getElementById("produtoPromocao").checked,

        lancamento:

            document.getElementById("produtoLancamento").checked,

        maisVendido:

            document.getElementById("produtoMaisVendido").checked

    };

}

/*==================================================
ATUALIZAR PRODUTO
==================================================*/

function atualizarProduto(produtoAtualizado){

    Admin.produtos =

        Admin.produtos.map(produto=>

            produto.id===produtoAtualizado.id

                ?

                produtoAtualizado

                :

                produto

        );

}

/*==================================================
EDITAR PRODUTO
==================================================*/

function editarProduto(id){

    Admin.produtoEditando =

        Admin.produtos.find(

            produto=>produto.id===id

        );

    if(!Admin.produtoEditando){

        return;

    }

    const produto = Admin.produtoEditando;

    document.getElementById("nomeProduto").value = produto.nome;

    document.getElementById("categoriaProduto").value = produto.categoria;

    document.getElementById("descricaoProduto").value = produto.descricao;

    document.getElementById("precoProduto").value = produto.preco;

    document.getElementById("imagemProduto").value = produto.imagem;

    document.getElementById("ordemProduto").value = produto.ordem;

    document.getElementById("produtoAtivo").checked = produto.ativo;

    document.getElementById("produtoDestaque").checked = produto.destaque;

    document.getElementById("produtoPromocao").checked = produto.promocao;

    document.getElementById("produtoLancamento").checked = produto.lancamento;

    document.getElementById("produtoMaisVendido").checked = produto.maisVendido;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*==================================================
EXCLUIR PRODUTO
==================================================*/

function excluirProduto(id){

    if(!confirmarExclusao()){

        return;

    }

    Admin.produtos =

        Admin.produtos.filter(

            produto=>produto.id!==id

        );

    salvarProdutos(

        Admin.produtos

    );

    atualizarPainel();

}
/*==================================================
RENDERIZAÇÃO
==================================================*/

function renderizarProdutos(){

    const tbody = document.getElementById(

        "listaProdutos"

    );

    if(!tbody){

        return;

    }

    if(Admin.produtos.length===0){

        tbody.innerHTML=`

<tr>

<td colspan="6">

<div class="sem-registros">

<h3>

Nenhum produto cadastrado

</h3>

<p>

Cadastre seu primeiro produto para que ele apareça automaticamente na Home e no Cardápio.

</p>

</div>

</td>

</tr>

`;

        return;

    }

    tbody.innerHTML="";

    Admin.produtos.forEach(produto=>{

        tbody.innerHTML += criarLinhaProduto(produto);

    });

}

/*==================================================
LINHA DA TABELA
==================================================*/

function criarLinhaProduto(produto){

    return `

<tr>

<td>

<img

src="${produto.imagem}"

alt="${produto.nome}"

class="produto-thumb">

</td>

<td>

<strong>

${produto.nome}

</strong>

</td>

<td>

${produto.categoria}

</td>

<td>

${formatarMoeda(produto.preco)}

</td>

<td>

${criarBadges(produto)}

</td>

<td>

<div class="acoes">

<button

class="btn-acao btn-editar"

onclick="editarProduto(${produto.id})"

title="Editar">

✏️

</button>

<button

class="btn-acao btn-excluir"

onclick="excluirProduto(${produto.id})"

title="Excluir">

🗑️

</button>

</div>

</td>

</tr>

`;

}

/*==================================================
BADGES
==================================================*/

function criarBadges(produto){

    let badges="";

    badges += produto.ativo

        ? '<span class="badge ativo">Ativo</span>'

        : '<span class="badge inativo">Inativo</span>';

    if(produto.promocao){

        badges +=

        '<span class="badge promocao">Promoção</span>';

    }

    if(produto.destaque){

        badges +=

        '<span class="badge destaque">Destaque</span>';

    }

    if(produto.lancamento){

        badges +=

        '<span class="badge lancamento">Novo</span>';

    }

    if(produto.maisVendido){

        badges +=

        '<span class="badge vendido">Mais Vendido</span>';

    }

    return badges;

}
/*==================================================
DASHBOARD
==================================================*/

function atualizarDashboard(){

    atualizarCard(

        "totalProdutos",

        Admin.produtos.length

    );

    atualizarCard(

        "totalPedidos",

        obterPedidos().length

    );

    atualizarCard(

        "totalClientes",

        obterClientes().length

    );

    atualizarCard(

        "faturamento",

        formatarMoeda(calcularFaturamento())

    );

    atualizarFinanceiro();

}

/*==================================================
CARDS
==================================================*/

function atualizarCard(id,valor){

    const elemento = document.getElementById(id);

    if(!elemento){

        return;

    }

    elemento.textContent = valor;

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
FATURAMENTO
==================================================*/

function calcularFaturamento(){

    return obterPedidos().reduce(

        (total,pedido)=>{

            return total +

            Number(

                pedido.totalPedido ||

                pedido.total ||

                0

            );

        },

        0

    );

}

function atualizarReceita(){

    atualizarCard(

        "receitaTotal",

        formatarMoeda(

            calcularFaturamento()

        )

    );

}

/*==================================================
PEDIDOS FINALIZADOS
==================================================*/

function atualizarPedidosFinalizados(){

    const total = obterPedidos()

        .filter(

            pedido=>

            pedido.status==="Finalizado"

        )

        .length;

    atualizarCard(

        "pedidosFinalizados",

        total

    );

}

/*==================================================
TICKET MÉDIO
==================================================*/

function atualizarTicketMedio(){

    const pedidos = obterPedidos();

    if(pedidos.length===0){

        atualizarCard(

            "ticketMedio",

            "R$ 0,00"

        );

        return;

    }

    const ticket =

        calcularFaturamento()

        /

        pedidos.length;

    atualizarCard(

        "ticketMedio",

        formatarMoeda(ticket)

    );

}

/*==================================================
PRODUTO MAIS VENDIDO
==================================================*/

function atualizarProdutoMaisVendido(){

    const ranking = {};

    obterPedidos().forEach(pedido=>{

        if(!pedido.itens){

            return;

        }

        pedido.itens.forEach(item=>{

            ranking[item.nome] =

                (ranking[item.nome] || 0)

                +

                item.quantidade;

        });

    });

    let nome = "—";

    let maior = 0;

    Object.entries(ranking)

        .forEach(([produto,qtd])=>{

            if(qtd>maior){

                maior=qtd;

                nome=produto;

            }

        });

    atualizarCard(

        "produtoMaisVendido",

        nome

    );

}
/*==================================================
CLIENTES
==================================================*/

function renderizarClientes(){

    const tbody = document.getElementById("listaClientes");

    if(!tbody){

        return;

    }

    const clientes = obterClientes();

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

        tbody.innerHTML += `

<tr>

<td>${cliente.nome}</td>

<td>${cliente.telefone || "-"}</td>

<td>${cliente.email || "-"}</td>

<td>${cliente.pedidos || 0}</td>

<td>${formatarMoeda(cliente.totalGasto || 0)}</td>

</tr>

`;

    });

}

/*==================================================
PEDIDOS
==================================================*/

function renderizarPedidos(){

    const tbody = document.getElementById("listaPedidos");

    if(!tbody){

        return;

    }

    const pedidos = obterPedidos();

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

        tbody.innerHTML += `

<tr>

<td>#${index+1}</td>

<td>${pedido.cliente || "-"}</td>

<td>${formatarMoeda(pedido.totalPedido || pedido.total || 0)}</td>

<td>${pedido.pagamento || "-"}</td>

<td>${pedido.status || "Recebido"}</td>

<td>

<button

class="btn-acao btn-visualizar"

title="Visualizar">

👁️

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

    const config = obterConfiguracoes();

    const campos = {

        nomeLoja:"nomeLoja",

        telefoneLoja:"telefoneLoja",

        pixLoja:"pixLoja",

        taxaEntrega:"taxaEntrega"

    };

    Object.entries(campos).forEach(([campo,id])=>{

        const elemento=document.getElementById(id);

        if(elemento){

            elemento.value=config[campo] || "";

        }

    });

}

function salvarConfiguracoesLoja(event){

    event.preventDefault();

    salvarConfiguracoes({

        nomeLoja:

            document.getElementById("nomeLoja").value,

        telefoneLoja:

            document.getElementById("telefoneLoja").value,

        pixLoja:

            document.getElementById("pixLoja").value,

        taxaEntrega:Number(

            document.getElementById("taxaEntrega").value

        ) || 0

    });

    mostrarMensagem(

        "Configurações salvas com sucesso!",

        "success"

    );

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

function confirmarExclusao(){

    return confirm(

        "Deseja realmente excluir este produto?"

    );

}

function limparFormulario(){

    const form=document.getElementById("formProduto");

    if(form){

        form.reset();

    }

    const ativo=document.getElementById("produtoAtivo");

    if(ativo){

        ativo.checked=true;

    }

    Admin.produtoEditando=null;

}

function mostrarMensagem(texto,tipo){

    const alerta=document.createElement("div");

    alerta.className=`alert alert-${tipo}`;

    alerta.textContent=texto;

    alerta.style.position="fixed";

    alerta.style.top="20px";

    alerta.style.right="20px";

    alerta.style.zIndex="99999";

    document.body.appendChild(alerta);

    setTimeout(()=>{

        alerta.remove();

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
API PÚBLICA
==================================================*/

window.editarProduto = editarProduto;

window.excluirProduto = excluirProduto;

/*==================================================
FIM DO ARQUIVO
ADMIN.JS V3.0
==================================================*/