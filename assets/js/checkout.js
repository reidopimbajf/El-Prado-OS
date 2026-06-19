/*==================================================
 EL PRADO BURGUER
 checkout.js
 Sprint 8.2
 Parte 1
==================================================*/

"use strict";

/*==================================================
CACHE
==================================================*/

const listaResumo =
document.getElementById("listaResumo");

const subtotalPedido =
document.getElementById("subtotalPedido");

const taxaEntrega =
document.getElementById("taxaEntrega");

const descontoPedido =
document.getElementById("descontoPedido");

const totalPedido =
document.getElementById("totalPedido");

const btnFinalizar =
document.getElementById("btnFinalizar");

/*==================================================
CLIENTE
==================================================*/

const campoNome =
document.getElementById("nome");

const campoTelefone =
document.getElementById("telefone");

const campoEmail =
document.getElementById("email"); // quando adicionarmos este campo

const campoCep =
document.getElementById("cep");

const campoRua =
document.getElementById("endereco");

const campoNumero =
document.getElementById("numero");

const campoComplemento =
document.getElementById("complemento");

const campoBairro =
document.getElementById("bairro");

const campoCidade =
document.getElementById("cidade");

const campoEstado =
document.getElementById("estado"); // quando adicionarmos este campo

/*==================================================
ESTADO
==================================================*/

let cliente = null;

let carrinho = [];

let subtotal = 0;

let entrega = 0;

let desconto = 0;

let total = 0;

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarCheckout

);

function iniciarCheckout(){

    validarSessao();

    carregarCliente();

    carregarCarrinho();

    preencherCliente();

    atualizarResumo();

    registrarEventos();

}

/*==================================================
VALIDAÇÃO
==================================================*/

function validarSessao(){

    if(

        !Storage.estaLogado()

    ){

        alert(

            "Faça login para continuar."

        );

        window.location.href="cliente.html";

        return;

    }

    cliente = Storage.getUsuario();

}
/*==================================================
CARREGAR CLIENTE
==================================================*/

function carregarCliente(){

    cliente = Storage.getUsuario();

    if(!cliente){

        return;

    }

}

/*==================================================
PREENCHER DADOS
==================================================*/

function preencherCliente(){

    if(!cliente){

        return;

    }

    campoNome.value = cliente.nome || "";

    campoTelefone.value = cliente.telefone || "";

    campoEmail.value = cliente.email || "";

    const endereco = cliente.endereco || {};

if(campoCep) campoCep.value = endereco.cep || "";

if(campoRua) campoRua.value = endereco.rua || "";

if(campoNumero) campoNumero.value = endereco.numero || "";

if(campoComplemento) campoComplemento.value = endereco.complemento || "";

if(campoBairro) campoBairro.value = endereco.bairro || "";

if(campoCidade) campoCidade.value = endereco.cidade || "";

if(campoEstado) campoEstado.value = endereco.estado || "";
}

/*==================================================
CARREGAR CARRINHO
==================================================*/

function carregarCarrinho(){

    carrinho = Storage.getCarrinho();

    if(carrinho.length===0){

        alert(

            "Seu carrinho está vazio."

        );

        window.location.href="carrinho.html";

        return;

    }

    renderResumo();

}

/*==================================================
RESUMO DOS PRODUTOS
==================================================*/

function renderResumo(){

    listaResumo.innerHTML="";

    carrinho.forEach(item=>{

        listaResumo.innerHTML += `

        <div class="checkout-item">

            <div>

                <strong>

                    ${item.nome}

                </strong>

                <p>

                    ${item.quantidade} x

                    ${moeda(item.preco)}

                </p>

            </div>

            <strong>

                ${moeda(

                    item.preco *

                    item.quantidade

                )}

            </strong>

        </div>

        `;

    });

}

/*==================================================
EVENTOS
==================================================*/

function registrarEventos(){

    if(btnFinalizar){

        btnFinalizar.addEventListener(

            "click",

            finalizarPedido

        );

    }

}
/*==================================================
RESUMO FINANCEIRO
==================================================*/

function atualizarResumo(){

    subtotal = carrinho.reduce(

        (total,item)=>

        total +

        (

            Number(item.preco) *

            Number(item.quantidade)

        ),

        0

    );

    /*=========================================
    TAXA DE ENTREGA
    =========================================*/

    entrega = subtotal >= 80

        ? 0

        : 8;

    /*=========================================
    DESCONTO
    =========================================*/

    desconto = 0;

    /*=========================================
    TOTAL
    =========================================*/

    total =

        subtotal +

        entrega -

        desconto;

    subtotalPedido.innerHTML =

        moeda(subtotal);

    taxaEntrega.innerHTML =

        entrega === 0

        ? "Grátis"

        : moeda(entrega);

    descontoPedido.innerHTML =

        moeda(desconto);

    totalPedido.innerHTML =

        moeda(total);

}

/*==================================================
CRIAR PEDIDO
==================================================*/

function montarPedido(){

    return{

        id:Storage.gerarId(),

        clienteId:cliente.id,

        clienteNome:cliente.nome,

        telefone:cliente.telefone,

        email:cliente.email,

        endereco:{

    cep: campoCep.value,

    rua: campoRua.value,

    numero: campoNumero.value,

    complemento: campoComplemento ? campoComplemento.value : "",

    bairro: campoBairro.value,

    cidade: campoCidade.value,

    estado: campoEstado.value

},

        itens: Storage.clonar(carrinho),

        subtotal,

        entrega,

        desconto,

        total,

        pagamento:

        document.querySelector(

            "input[name='pagamento']:checked"

        ).value,

        observacao:

        document.getElementById(

            "observacaoPedido"

        ).value,

        status:"Recebido",

        data:Storage.dataAtual()

    };

}

/*==================================================
VALIDAÇÃO
==================================================*/

function validarCheckout(){

    if(carrinho.length===0){

        alert(

            "Seu carrinho está vazio."

        );

        return false;

    }

   if(!campoRua || campoRua.value.trim()===""){

    alert("Endereço não encontrado.");

    return false;

}

if(!campoNumero || campoNumero.value.trim()===""){

    alert("Número do endereço não encontrado.");

    return false;

}

if(!campoCidade || campoCidade.value.trim()===""){

    alert("Cidade não encontrada.");

    return false;

}

if(!campoEstado || campoEstado.value.trim()===""){

    alert("Estado não encontrado.");

    return false;

}

    return true;

}/*==================================================
FINALIZAR PEDIDO
==================================================*/

function finalizarPedido(){

    if(!validarCheckout()){

        return;

    }

    mostrarLoading();

    salvarEnderecoCliente();

    const pedido = montarPedido();

    Storage.criarPedido(pedido);

    Storage.atualizarEstatisticasCliente(

        cliente.id,

        pedido

    );

Storage.salvarCarrinho([]);

atualizarCheckout();

    setTimeout(()=>{

    esconderLoading();

    mostrarToast(

        "Pedido realizado com sucesso! 🍔"

    );

    setTimeout(()=>{

        window.location.href=

        "pedido-sucesso.html?id=" + pedido.id;

    },1500);

},1200);

}

/*==================================================
SALVAR ENDEREÇO
==================================================*/
function salvarEnderecoCliente(){

    const clienteAtualizado = Storage.atualizarCliente(

        cliente.id,

        {

            nome: campoNome.value,

            telefone: campoTelefone.value,

            endereco:{

                cep: campoCep.value,

                rua: campoRua.value,

                numero: campoNumero.value,

                complemento: campoComplemento ? campoComplemento.value : "",

                bairro: campoBairro.value,

                cidade: campoCidade.value,

                estado: campoEstado.value

            }

        }

    );

    if(clienteAtualizado){

        cliente = clienteAtualizado;

        Storage.login(clienteAtualizado);

    }

}

/*==================================================
LOADING
==================================================*/

function mostrarLoading(){

    const modal =

        document.getElementById(

            "modalLoading"

        );

    if(modal){

        modal.style.display="flex";

    }

}

function esconderLoading(){

    const modal =

        document.getElementById(

            "modalLoading"

        );

    if(modal){

        modal.style.display="none";

    }

}

/*==================================================
TOAST
==================================================*/

function mostrarToast(texto){

    const toast =

        document.getElementById(

            "toast"

        );

    if(!toast){

        return;

    }

    toast.innerHTML = texto;

    toast.classList.add(

        "mostrar"

    );

    setTimeout(()=>{

        toast.classList.remove(

            "mostrar"

        );

    },3000);

}
/*==================================================
 EL PRADO BURGUER
 checkout.js
 Sprint 8.2
 Parte Final
==================================================*/

/*=========================================
ATUALIZAR RESUMO
=========================================*/

function atualizarCheckout(){

    carregarCarrinho();

    atualizarResumo();

}

/*=========================================
RECARREGAR DADOS DO CLIENTE
=========================================*/

function atualizarCliente(){

    cliente = Storage.getUsuario();

    preencherCliente();

}

/*=========================================
VERIFICA CARRINHO
=========================================*/

function checkoutPronto(){

    return (

        cliente !== null &&

        carrinho.length > 0

    );

}

/*=========================================
API PÚBLICA
=========================================*/

window.checkout = {

    atualizar(){

        atualizarCheckout();

    },

    atualizarCliente(){

        atualizarCliente();

    },

    total(){

        return total;

    },

    subtotal(){

        return subtotal;

    },

    itens(){

        return carrinho.length;

    },

    cliente(){

        return cliente;

    }

};

/*=========================================
MONITOR DE STORAGE
=========================================*/

window.addEventListener(

    "storage",

    ()=>{

        atualizarCheckout();

        atualizarCliente();

    }

);

/*=========================================
LOG
=========================================*/

Storage.log(

    "Checkout inicializado."

);

console.table({

    modulo:"Checkout",

    versao:"8.2",

    cliente:

        cliente

        ? cliente.nome

        : "Nenhum",

    itens:carrinho.length,

    subtotal,

    entrega,

    total

});