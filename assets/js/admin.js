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
