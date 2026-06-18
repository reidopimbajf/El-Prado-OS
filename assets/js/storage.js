/*==================================================
 EL PRADO OS
 STORAGE.JS
 Central de Persistência
==================================================*/

const Storage = {

    /*=========================================
      CHAVES
    =========================================*/

    keys:{

        produtos:"elprado_produtos",

        pedidos:"elprado_pedidos",

        clientes:"elprado_clientes",

        carrinho:"elprado_carrinho",

        usuario:"elprado_usuario",

        configuracoes:"elprado_config",

        cupons:"elprado_cupons"

    },

    /*=========================================
      MÉTODOS GENÉRICOS
    =========================================*/

    salvar(chave,dados){

        localStorage.setItem(

            chave,

            JSON.stringify(dados)

        );

    },

    buscar(chave){

        const dados = localStorage.getItem(chave);

        return dados ? JSON.parse(dados) : [];

    },

    remover(chave){

        localStorage.removeItem(chave);

    },

    limparTudo(){

        localStorage.clear();

    }

};

/*==================================================
PRODUTOS
==================================================*/

function obterProdutos(){

    return Storage.buscar(

        Storage.keys.produtos

    );

}

function salvarProdutos(lista){

    Storage.salvar(

        Storage.keys.produtos,

        lista

    );

}

/*==================================================
PEDIDOS
==================================================*/

function obterPedidos(){

    return Storage.buscar(

        Storage.keys.pedidos

    );

}

function salvarPedidos(lista){

    Storage.salvar(

        Storage.keys.pedidos,

        lista

    );

}

/*==================================================
CLIENTES
==================================================*/

function obterClientes(){

    return Storage.buscar(

        Storage.keys.clientes

    );

}

function salvarClientes(lista){

    Storage.salvar(

        Storage.keys.clientes,

        lista

    );

}

/*==================================================
CARRINHO
==================================================*/

function obterCarrinho(){

    return Storage.buscar(

        Storage.keys.carrinho

    );

}

function salvarCarrinho(lista){

    Storage.salvar(

        Storage.keys.carrinho,

        lista

    );

}

function limparCarrinho(){

    Storage.remover(

        Storage.keys.carrinho

    );

}

/*==================================================
USUÁRIO LOGADO
==================================================*/

function obterUsuario(){

    const usuario = localStorage.getItem(

        Storage.keys.usuario

    );

    return usuario

        ? JSON.parse(usuario)

        : null;

}

function salvarUsuario(usuario){

    localStorage.setItem(

        Storage.keys.usuario,

        JSON.stringify(usuario)

    );

}

function logoutUsuario(){

    Storage.remover(

        Storage.keys.usuario

    );

}

/*==================================================
CUPONS
==================================================*/

function obterCupons(){

    return Storage.buscar(

        Storage.keys.cupons

    );

}

function salvarCupons(lista){

    Storage.salvar(

        Storage.keys.cupons,

        lista

    );

}

/*==================================================
CONFIGURAÇÕES
==================================================*/

function obterConfiguracoes(){

    const config = localStorage.getItem(

        Storage.keys.configuracoes

    );

    return config

        ? JSON.parse(config)

        : {};

}

function salvarConfiguracoes(config){

    localStorage.setItem(

        Storage.keys.configuracoes,

        JSON.stringify(config)

    );

}

/*==================================================
DASHBOARD
==================================================*/

function totalPedidos(){

    return obterPedidos().length;

}

function totalClientes(){

    return obterClientes().length;

}

function totalProdutos(){

    return obterProdutos().length;

}

function faturamentoTotal(){

    let total = 0;

    obterPedidos().forEach(

        pedido=>{

            total += Number(

                pedido.total || 0

            );

        }

    );

    return total;

}
/*==================================================
COMPATIBILIDADE ADMIN + SITE
SPRINT 6
==================================================*/

Storage.getProdutos = obterProdutos;
Storage.salvarProdutos = salvarProdutos;

Storage.getPedidos = obterPedidos;
Storage.salvarPedidos = salvarPedidos;

Storage.getClientes = obterClientes;
Storage.salvarClientes = salvarClientes;

Storage.getCarrinho = obterCarrinho;
Storage.salvarCarrinho = salvarCarrinho;

Storage.getConfiguracoes = obterConfiguracoes;
Storage.salvarConfiguracoes = salvarConfiguracoes;

/*==================================================
CLIENTES INTELIGENTES
==================================================*/

Storage.buscarClientePorTelefone = function(telefone){

    telefone = (telefone || "").replace(/\D/g,"");

    return this.getClientes().find(cliente =>

        (cliente.telefone || "").replace(/\D/g,"") === telefone

    );

};

Storage.buscarClientePorId = function(id){

    return this.getClientes().find(

        cliente => cliente.id === id

    );

};

Storage.salvarCliente = function(dados){

    const clientes = this.getClientes();

    const telefone = (dados.telefone || "").replace(/\D/g,"");

    let cliente = clientes.find(c =>

        (c.telefone || "").replace(/\D/g,"") === telefone

    );

    if(cliente){

        cliente.nome = dados.nome || cliente.nome;

        cliente.email = dados.email || cliente.email;

        cliente.endereco = dados.endereco || cliente.endereco;

        cliente.ativo = true;

    }else{

        cliente = {

            id: Date.now(),

            nome: dados.nome || "",

            telefone,

            email: dados.email || "",

            endereco: dados.endereco || {

                cep:"",
                rua:"",
                numero:"",
                complemento:"",
                bairro:"",
                cidade:"",
                estado:""

            },

            pedidos:0,

            totalGasto:0,

            ticketMedio:0,

            dataCadastro:new Date().toISOString(),

            ultimoPedido:null,

            ativo:true

        };

        clientes.push(cliente);

    }

    this.salvarClientes(clientes);

    return cliente;

};

Storage.atualizarEstatisticasCliente = function(clienteId,pedido){

    const clientes = this.getClientes();

    const cliente = clientes.find(

        c => c.id === clienteId

    );

    if(!cliente) return;

    cliente.pedidos++;

    cliente.totalGasto += Number(pedido.total || 0);

    cliente.ticketMedio =

        cliente.totalGasto /

        cliente.pedidos;

    cliente.ultimoPedido =

        new Date().toISOString();

    this.salvarClientes(clientes);

};