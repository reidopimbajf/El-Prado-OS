/*==================================================
 EL PRADO OS
 STORAGE.JS
 Central de Persistência
==================================================*/

const Storage = {
/*=========================================
  VERSÃO
=========================================*/

version:"2.0.0",
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

    },
/*=========================================
  EXISTE CHAVE
=========================================*/

existe(chave){

    return localStorage.getItem(chave) !== null;

},

/*=========================================
  RESETAR CHAVE
=========================================*/

resetar(chave){

    this.remover(chave);

    this.salvar(chave,[]);

},

/*=========================================
  CONTAR REGISTROS
=========================================*/

contar(chave){

    return this.buscar(chave).length;

},

/*=========================================
  EXPORTAR
=========================================*/

exportar(){

    return{

        produtos:this.getProdutos(),

        pedidos:this.getPedidos(),

        clientes:this.getClientes(),

        carrinho:this.getCarrinho(),

        configuracoes:this.getConfiguracoes()

    };

},

/*=========================================
  IMPORTAR
=========================================*/

importar(dados){

    if(dados.produtos)

        this.salvarProdutos(dados.produtos);

    if(dados.pedidos)

        this.salvarPedidos(dados.pedidos);

    if(dados.clientes)

        this.salvarClientes(dados.clientes);

    if(dados.carrinho)

        this.salvarCarrinho(dados.carrinho);

    if(dados.configuracoes)

        this.salvarConfiguracoes(

            dados.configuracoes

        );

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

    cliente.telefone = telefone;

    if(dados.senha){

        cliente.senha = dados.senha;

    }

    cliente.endereco = {

        ...cliente.endereco,

        ...(dados.endereco || {})

    };

    cliente.ativo = true;

}

    
    else{

       cliente = {

    id: dados.id || Date.now(),

    nome: dados.nome || "",

    telefone,

    email: dados.email || "",

    senha: dados.senha || "",

    endereco: dados.endereco || {

        cep:"",
        rua:"",
        numero:"",
        complemento:"",
        bairro:"",
        cidade:"",
        estado:""

    },

    favoritos: dados.favoritos || [],

    pedidos: 0,

    totalGasto: 0,

    ticketMedio: 0,

    dataCadastro: dados.dataCadastro || new Date().toISOString(),

    ultimoPedido:"",

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

/*==================================================
API V2 - CLIENTES
==================================================*/

/*---------------------------------------
 LISTAR TODOS
---------------------------------------*/

Storage.getCliente = function(id){

    return this.getClientes().find(

        cliente => cliente.id === id

    ) || null;

};

/*---------------------------------------
 BUSCAR POR E-MAIL
---------------------------------------*/

Storage.getClientePorEmail = function(email){

    return this.getClientes().find(

        cliente =>

        (cliente.email || "").toLowerCase() ===

        (email || "").toLowerCase()

    ) || null;

};

/*---------------------------------------
 VERIFICAR EXISTÊNCIA
---------------------------------------*/

Storage.clienteExiste = function(email){

    return this.getClientePorEmail(email) !== null;

};

/*---------------------------------------
 ATUALIZAR CLIENTE
---------------------------------------*/

Storage.atualizarCliente = function(id,dados){

    const clientes = this.getClientes();

    const indice = clientes.findIndex(

        cliente => cliente.id === id

    );

    if(indice === -1){

        return false;

    }

    clientes[indice]={

        ...clientes[indice],

        ...dados

    };

    this.salvarClientes(clientes);

    return clientes[indice];

};

/*---------------------------------------
 REMOVER CLIENTE
---------------------------------------*/

Storage.removerCliente = function(id){

    const clientes = this.getClientes()

        .filter(cliente=>cliente.id!==id);

    this.salvarClientes(clientes);

};

/*---------------------------------------
 TOTAL DE CLIENTES ATIVOS
---------------------------------------*/

Storage.totalClientesAtivos = function(){

    return this.getClientes()

        .filter(cliente=>cliente.ativo)

        .length;

};

/*---------------------------------------
 ÚLTIMOS CLIENTES
---------------------------------------*/

Storage.ultimosClientes = function(limite=5){

    return this.getClientes()

        .sort((a,b)=>

            new Date(b.dataCadastro)-

            new Date(a.dataCadastro)

        )

        .slice(0,limite);

};

/*---------------------------------------
 PESQUISA
---------------------------------------*/

Storage.pesquisarClientes = function(texto){

    texto=(texto||"").toLowerCase();

    return this.getClientes().filter(cliente=>

        (cliente.nome||"")

        .toLowerCase()

        .includes(texto)

        ||

        (cliente.email||"")

        .toLowerCase()

        .includes(texto)

        ||

        (cliente.telefone||"")

        .includes(texto)

    );

};
/*==================================================
API V2 - PRODUTOS
==================================================*/

/*---------------------------------------
 BUSCAR PRODUTO
---------------------------------------*/

Storage.getProduto = function(id){

    return this.getProdutos().find(

        produto => produto.id === id

    ) || null;

};

/*---------------------------------------
 PRODUTO EXISTE
---------------------------------------*/

Storage.produtoExiste = function(id){

    return this.getProduto(id) !== null;

};

/*---------------------------------------
 ADICIONAR PRODUTO
---------------------------------------*/

Storage.salvarProduto = function(produto){

    const produtos = this.getProdutos();

    produtos.push(produto);

    this.salvarProdutos(produtos);

    return produto;

};

/*---------------------------------------
 EDITAR PRODUTO
---------------------------------------*/

Storage.editarProduto = function(id,dados){

    const produtos = this.getProdutos();

    const indice = produtos.findIndex(

        produto=>produto.id===id

    );

    if(indice===-1){

        return false;

    }

    produtos[indice]={

        ...produtos[indice],

        ...dados

    };

    this.salvarProdutos(produtos);

    return produtos[indice];

};

/*---------------------------------------
 REMOVER PRODUTO
---------------------------------------*/

Storage.removerProduto = function(id){

    const produtos = this.getProdutos()

        .filter(produto=>produto.id!==id);

    this.salvarProdutos(produtos);

};

/*---------------------------------------
 PESQUISAR PRODUTOS
---------------------------------------*/

Storage.pesquisarProdutos = function(texto){

    texto=(texto||"").toLowerCase();

    return this.getProdutos().filter(produto=>

        (produto.nome||"")

        .toLowerCase()

        .includes(texto)

    );

};

/*==================================================
API V2 - CARRINHO
==================================================*/

/*---------------------------------------
 ADICIONAR ITEM
---------------------------------------*/

Storage.adicionarCarrinho = function(item){

    const carrinho = this.getCarrinho();

    const existente = carrinho.find(

        produto=>produto.id===item.id

    );

    if(existente){

        existente.quantidade +=

            item.quantidade || 1;

    }else{

        carrinho.push({

            ...item,

            quantidade:item.quantidade || 1

        });

    }

    this.salvarCarrinho(carrinho);

};

/*---------------------------------------
 REMOVER ITEM
---------------------------------------*/

Storage.removerItemCarrinho = function(id){

    const carrinho = this.getCarrinho()

        .filter(item=>item.id!==id);

    this.salvarCarrinho(carrinho);

};

/*---------------------------------------
 ALTERAR QUANTIDADE
---------------------------------------*/

Storage.alterarQuantidade = function(id,quantidade){

    const carrinho = this.getCarrinho();

    const item = carrinho.find(

        produto=>produto.id===id

    );

    if(item){

        item.quantidade = quantidade;

    }

    this.salvarCarrinho(carrinho);

};

/*---------------------------------------
 TOTAL ITENS
---------------------------------------*/

Storage.totalItensCarrinho = function(){

    return this.getCarrinho()

        .reduce(

            (total,item)=>

            total+item.quantidade,

            0

        );

};

/*---------------------------------------
 TOTAL CARRINHO
---------------------------------------*/

Storage.calcularCarrinho = function(){

    return this.getCarrinho()

        .reduce(

            (total,item)=>

            total+

            (

                Number(item.preco||0)

                *

                Number(item.quantidade||1)

            ),

            0

        );

};

/*---------------------------------------
 CARRINHO VAZIO
---------------------------------------*/

Storage.carrinhoVazio = function(){

    return this.totalItensCarrinho()===0;

};
/*==================================================
API V2 - PEDIDOS
==================================================*/

/*---------------------------------------
 BUSCAR PEDIDO
---------------------------------------*/

Storage.getPedido = function(id){

    return this.getPedidos().find(

        pedido => pedido.id === id

    ) || null;

};

/*---------------------------------------
 CRIAR PEDIDO
---------------------------------------*/

Storage.criarPedido = function(pedido){

    const pedidos = this.getPedidos();

    pedido.id = pedido.id || Date.now();

    pedido.data = pedido.data || new Date().toISOString();

    pedido.status = pedido.status || "Recebido";

    pedidos.push(pedido);

    this.salvarPedidos(pedidos);

    return pedido;

};

/*---------------------------------------
 ATUALIZAR PEDIDO
---------------------------------------*/

Storage.atualizarPedido = function(id,dados){

    const pedidos = this.getPedidos();

    const indice = pedidos.findIndex(

        pedido => pedido.id === id

    );

    if(indice === -1){

        return false;

    }

    pedidos[indice] = {

        ...pedidos[indice],

        ...dados

    };

    this.salvarPedidos(pedidos);

    return pedidos[indice];

};

/*---------------------------------------
 CANCELAR PEDIDO
---------------------------------------*/

Storage.cancelarPedido = function(id){

    return this.atualizarPedido(

        id,

        {

            status:"Cancelado"

        }

    );

};

/*---------------------------------------
 PEDIDOS DO CLIENTE
---------------------------------------*/

Storage.getPedidosCliente = function(clienteId){

    return this.getPedidos().filter(

        pedido => pedido.clienteId === clienteId

    );

};

/*==================================================
API V2 - SESSÃO
==================================================*/

Storage.login = function(usuario){

    this.salvarUsuario(usuario);

};

Storage.estaLogado = function(){

    return this.getUsuario() !== null;

};

Storage.logout = function(){

    logoutUsuario();

};

/*==================================================
API V2 - DASHBOARD
==================================================*/

Storage.dashboard = function(){

    const pedidos = this.getPedidos();

    const clientes = this.getClientes();

    const produtos = this.getProdutos();

    const faturamento = pedidos.reduce(

        (total,pedido)=>

        total + Number(pedido.total || 0),

        0

    );

    const ticketMedio = pedidos.length

        ? faturamento / pedidos.length

        : 0;

    const hoje = new Date().toISOString().slice(0,10);

    const pedidosHoje = pedidos.filter(

        pedido=>

        (pedido.data || "").startsWith(hoje)

    ).length;

    return{

        clientes:clientes.length,

        clientesAtivos:clientes.filter(

            cliente=>cliente.ativo

        ).length,

        produtos:produtos.length,

        pedidos:pedidos.length,

        pedidosHoje,

        faturamento,

        ticketMedio

    };

};
/*==================================================
API V2 - WHITE LABEL
==================================================*/

/*---------------------------------------
 TEMA
---------------------------------------*/

Storage.getTema = function(){

    const config = this.getConfiguracoes();

    return config.tema || "default";

};

Storage.salvarTema = function(tema){

    const config = this.getConfiguracoes();

    config.tema = tema;

    this.salvarConfiguracoes(config);

};

/*---------------------------------------
 LOGO
---------------------------------------*/

Storage.getLogo = function(){

    const config = this.getConfiguracoes();

    return config.logo || "../assets/img/logo.png";

};

Storage.salvarLogo = function(logo){

    const config = this.getConfiguracoes();

    config.logo = logo;

    this.salvarConfiguracoes(config);

};

/*---------------------------------------
 NOME DA EMPRESA
---------------------------------------*/

Storage.getEmpresa = function(){

    const config = this.getConfiguracoes();

    return config.empresa || "El Prado Burguer";

};

Storage.salvarEmpresa = function(nome){

    const config = this.getConfiguracoes();

    config.empresa = nome;

    this.salvarConfiguracoes(config);

};

/*---------------------------------------
 RESET CONFIGURAÇÕES
---------------------------------------*/

Storage.resetConfiguracoes = function(){

    this.salvarConfiguracoes({

        empresa:"El Prado Burguer",

        tema:"default",

        logo:"../assets/img/logo.png"

    });

};

/*==================================================
UTILITÁRIOS
==================================================*/

/*---------------------------------------
 GERAR ID
---------------------------------------*/

Storage.gerarId = function(){

    return Date.now() +

    Math.floor(Math.random()*1000);

};

/*---------------------------------------
 DATA FORMATADA
---------------------------------------*/

Storage.dataAtual = function(){

    return new Date().toISOString();

};

/*---------------------------------------
 CLONAR OBJETO
---------------------------------------*/

Storage.clonar = function(obj){

    return JSON.parse(

        JSON.stringify(obj)

    );

};

/*---------------------------------------
 LIMPAR DADOS INVÁLIDOS
---------------------------------------*/

Storage.validarArray = function(valor){

    return Array.isArray(valor)

        ? valor

        : [];

};

/*---------------------------------------
 LOG SISTEMA
---------------------------------------*/

Storage.log = function(mensagem){

    console.log(

        "[EL PRADO OS]",

        mensagem

    );

};

/*==================================================
ALIASES DE COMPATIBILIDADE
==================================================*/

Storage.removerCarrinho =

Storage.removerItemCarrinho;

Storage.getDashboard =

Storage.dashboard;

/*==================================================
VALIDAÇÃO GERAL
==================================================*/

Storage.healthCheck = function(){

    return{

        versao:this.version,

        status:"OK",

        produtos:this.totalProdutos(),

        clientes:this.totalClientes(),

        pedidos:this.totalPedidos(),

        usuarioLogado:this.estaLogado(),

        data:this.dataAtual()

    };

};

/*==================================================
INICIALIZAÇÃO
==================================================*/

Storage.init = function(){

    this.log(

        "Storage V2 iniciado."

    );

    return this.healthCheck();

};

/*==================================================
AUTO START
==================================================*/


/*==================================================
COMPATIBILIDADE V2
==================================================*/

Storage.getUsuario = obterUsuario;

Storage.salvarUsuario = salvarUsuario;


Storage.totalClientes = totalClientes;

Storage.totalProdutos = totalProdutos;

Storage.totalPedidos = totalPedidos;

Storage.totalFaturamento = faturamentoTotal;
Storage.getUsuario = obterUsuario;
Storage.salvarUsuario = salvarUsuario;
Storage.logoutUsuario = logoutUsuario;
    Storage.init();
/*==================================================
UTILITÁRIOS
==================================================*/

Storage.getVersao = function(){

    return this.version;

};

Storage.ping = function(){

    return{

        status:"OK",

        versao:this.version,

        data:new Date().toISOString()

    };

};/*==================================================
ADMINISTRADOR
==================================================*/

loginAdmin(admin){

    localStorage.setItem(

        "adminLogado",

        JSON.stringify(admin)

    );

},

logoutAdmin(){

    localStorage.removeItem(

        "adminLogado"

    );

},

adminEstaLogado(){

    return localStorage.getItem(

        "adminLogado"

    ) !== null;

},

getAdmin(){

    return JSON.parse(

        localStorage.getItem(

            "adminLogado"

        )

    );

},
    Storage.init();
