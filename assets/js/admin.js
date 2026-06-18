/*==================================================
 EL PRADO BURGUER
 ADMIN.JS
==================================================*/

document.addEventListener("DOMContentLoaded", iniciarAdmin);

/*==================================================
 VARIÁVEIS
==================================================*/

let produtos = [];

let produtoEditando = null;

/*==================================================
 INICIAR
==================================================*/

function iniciarAdmin(){

    produtos = obterProdutos();

    atualizarDashboard();

    listarProdutos();

    configurarFormulario();

    carregarConfiguracoes();

}

/*==================================================
 FORMULÁRIO
==================================================*/

function configurarFormulario(){

    const formulario = document.getElementById("formProduto");

    if(!formulario){

        return;

    }

    formulario.addEventListener(

        "submit",

        salvarProduto

    );

}

/*==================================================
 DASHBOARD
==================================================*/

function atualizarDashboard(){

    document.getElementById("totalProdutos").textContent =

    obterProdutos().length;

    document.getElementById("totalPedidos").textContent =

    obterPedidos().length;

    document.getElementById("totalClientes").textContent =

    obterClientes().length;

    document.getElementById("faturamento").textContent =

    "R$ " +

    faturamentoTotal()

    .toFixed(2)

    .replace(".",",");

}
/*==================================================
 SALVAR PRODUTO
==================================================*/

function salvarProduto(evento){

    evento.preventDefault();

    const produto = {

        id: produtoEditando ? produtoEditando.id : Date.now(),

        nome: document.getElementById("nomeProduto").value.trim(),

        categoria: document.getElementById("categoriaProduto").value,

        descricao: document.getElementById("descricaoProduto").value.trim(),

        preco: Number(

            document.getElementById("precoProduto").value

        ),

        imagem: document.getElementById("imagemProduto").value.trim(),

        destaque: document.getElementById("produtoDestaque").checked,

        promocao: document.getElementById("produtoPromocao").checked

    };

    if(

        produto.nome === "" ||

        produto.descricao === "" ||

        produto.imagem === "" ||

        produto.preco <= 0

    ){

        alert("Preencha todos os campos obrigatórios.");

        return;

    }

    if(produtoEditando){

        const indice = produtos.findIndex(

            item => item.id === produto.id

        );

        produtos[indice] = produto;

        produtoEditando = null;

    }else{

        produtos.push(produto);

    }

    salvarProdutos(produtos);

    listarProdutos();

    atualizarDashboard();

    limparFormulario();

}

/*==================================================
 LIMPAR FORMULÁRIO
==================================================*/

function limparFormulario(){

    document.getElementById("formProduto").reset();

    produtoEditando = null;

    const botao = document.querySelector(".btn-salvar");

    if(botao){

        botao.textContent = "Salvar Produto";

        botao.classList.remove("btn-atualizar");

    }

}
/*==================================================
 LISTAR PRODUTOS
==================================================*/

function listarProdutos(){

    const tabela = document.getElementById("listaProdutos");

    if(!tabela){

        return;

    }

    produtos = obterProdutos();

    tabela.innerHTML = "";

    if(produtos.length === 0){

        tabela.innerHTML = `

<tr>

<td colspan="7">

<div class="sem-registros">

<i class="fa-solid fa-burger"></i>

<h3>

Nenhum produto cadastrado.

</h3>

<p>

Cadastre seu primeiro produto.

</p>

</div>

</td>

</tr>

`;

        return;

    }

    produtos.forEach(produto=>{

        tabela.innerHTML += `

<tr>

<td>

<img

src="${produto.imagem}"

alt="${produto.nome}"

>

</td>

<td>

${produto.nome}

</td>

<td>

${produto.categoria}

</td>

<td>

R$ ${produto.preco.toFixed(2).replace(".",",")}

</td>

<td>

${produto.destaque

? '<span class="status ativo">Sim</span>'

: '<span class="status inativo">Não</span>'}

</td>

<td>

${produto.promocao

? '<span class="status promocao">Sim</span>'

: '<span class="status inativo">Não</span>'}

</td>

<td>

<div class="acoes">

<button

class="btn-acao btn-visualizar"

onclick="visualizarProduto(${produto.id})">

<i class="fa-solid fa-eye"></i>

</button>

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
 VISUALIZAR
==================================================*/

function visualizarProduto(id){

    const produto = produtos.find(

        item => item.id === id

    );

    if(!produto){

        return;

    }

    alert(

`${produto.nome}

Categoria: ${produto.categoria}

Preço: R$ ${produto.preco.toFixed(2).replace(".",",")}

Descrição:

${produto.descricao}`

    );

}

/*==================================================
 EDITAR
==================================================*/

function editarProduto(id){

    const produto = produtos.find(

        item => item.id === id

    );

    if(!produto){

        return;

    }

    produtoEditando = produto;

    document.getElementById("nomeProduto").value = produto.nome;

    document.getElementById("categoriaProduto").value = produto.categoria;

    document.getElementById("descricaoProduto").value = produto.descricao;

    document.getElementById("precoProduto").value = produto.preco;

    document.getElementById("imagemProduto").value = produto.imagem;

    document.getElementById("produtoDestaque").checked = produto.destaque;

    document.getElementById("produtoPromocao").checked = produto.promocao;

    const botao = document.querySelector(".btn-salvar");

    botao.textContent = "Atualizar Produto";

    botao.classList.add("btn-atualizar");

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*==================================================
 EXCLUIR
==================================================*/

function excluirProduto(id){

    if(!confirm(

        "Deseja excluir este produto?"

    )){

        return;

    }

    produtos = produtos.filter(

        item => item.id !== id

    );

    salvarProdutos(produtos);

    listarProdutos();

    atualizarDashboard();

}
/*==================================================
 PEDIDOS
==================================================*/

function listarPedidos(){

    const tabela = document.getElementById("listaPedidos");

    if(!tabela){

        return;

    }

    const pedidos = obterPedidos();

    tabela.innerHTML = "";

    if(pedidos.length === 0){

        tabela.innerHTML = `

<tr>

<td colspan="6">

<div class="sem-registros">

<i class="fa-solid fa-receipt"></i>

<h3>

Nenhum pedido encontrado.

</h3>

</div>

</td>

</tr>

`;

        return;

    }

    pedidos.forEach(pedido=>{

        tabela.innerHTML += `

<tr>

<td>#${pedido.id}</td>

<td>${pedido.cliente.nome}</td>

<td>

R$ ${Number(pedido.total).toFixed(2).replace(".",",")}

</td>

<td>${pedido.pagamento}</td>

<td>

<span class="status ativo">

Novo

</span>

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
 VISUALIZAR PEDIDO
==================================================*/

function visualizarPedido(id){

    const pedido = obterPedidos().find(

        item=>item.id===id

    );

    if(!pedido){

        return;

    }

    let itens = "";

    pedido.itens.forEach(item=>{

        itens +=

`${item.quantidade}x ${item.nome}
`;

    });

    alert(

`PEDIDO #${pedido.id}

Cliente:
${pedido.cliente.nome}

Pagamento:
${pedido.pagamento}

Entrega:
${pedido.entrega}

Itens:

${itens}

Total:
R$ ${Number(pedido.total).toFixed(2).replace(".",",")}`

    );

}

/*==================================================
 CLIENTES
==================================================*/

function listarClientes(){

    const tabela = document.getElementById("listaClientes");

    if(!tabela){

        return;

    }

    const pedidos = obterPedidos();

    const clientes = {};

    pedidos.forEach(pedido=>{

        const telefone = pedido.cliente.telefone;

        if(!clientes[telefone]){

            clientes[telefone]={

                nome:pedido.cliente.nome,

                telefone,

                pedidos:0,

                total:0

            };

        }

        clientes[telefone].pedidos++;

        clientes[telefone].total += Number(pedido.total);

    });

    tabela.innerHTML="";

    Object.values(clientes).forEach(cliente=>{

        tabela.innerHTML += `

<tr>

<td>${cliente.nome}</td>

<td>${cliente.telefone}</td>

<td>${cliente.pedidos}</td>

<td>

R$ ${cliente.total.toFixed(2).replace(".",",")}

</td>

</tr>

`;

    });

}

/*==================================================
 FINANCEIRO
==================================================*/

function atualizarFinanceiro(){

    const pedidos = obterPedidos();

    let receita = 0;

    pedidos.forEach(pedido=>{

        receita += Number(pedido.total);

    });

    const ticket =

    pedidos.length

    ?

    receita / pedidos.length

    :

    0;

    document.getElementById("receitaTotal").textContent =

    "R$ " +

    receita.toFixed(2).replace(".",",");

    document.getElementById("pedidosFinalizados").textContent =

    pedidos.length;

    document.getElementById("ticketMedio").textContent =

    "R$ " +

    ticket.toFixed(2).replace(".",",");

}
/*==================================================
 CONFIGURAÇÕES
==================================================*/

function carregarConfiguracoes(){

    const config = obterConfiguracoes();

    document.getElementById("nomeLoja").value =
        config.nomeLoja || "El Prado Burguer";

    document.getElementById("telefoneLoja").value =
        config.telefone || "";

    document.getElementById("taxaEntrega").value =
        config.taxaEntrega || "";

    document.getElementById("pixLoja").value =
        config.pix || "";

    const formulario = document.getElementById("formConfiguracoes");

    if(formulario){

        formulario.addEventListener(

            "submit",

            salvarConfiguracoesLoja

        );

    }

}

/*==================================================
 SALVAR CONFIGURAÇÕES
==================================================*/

function salvarConfiguracoesLoja(evento){

    evento.preventDefault();

    const configuracoes = {

        nomeLoja:

        document.getElementById("nomeLoja").value,

        telefone:

        document.getElementById("telefoneLoja").value,

        taxaEntrega:

        Number(

        document.getElementById("taxaEntrega").value

        ),

        pix:

        document.getElementById("pixLoja").value

    };

    salvarConfiguracoes(configuracoes);

    alert(

        "Configurações salvas com sucesso!"

    );

}

/*==================================================
 ATUALIZAÇÃO GERAL
==================================================*/

function atualizarPainel(){

    atualizarDashboard();

    listarProdutos();

    listarPedidos();

    listarClientes();

    atualizarFinanceiro();

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