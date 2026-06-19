/*==================================================
 EL PRADO BURGUER
 admin-pedidos.js
 Sprint 9.1
 Parte 3
==================================================*/

"use strict";

/*==================================================
CACHE
==================================================*/

const listaPedidos =
document.getElementById("listaPedidos");

const pesquisaPedido =
document.getElementById("pesquisaPedido");

const filtros =

document.querySelectorAll(

    ".filtro"

);

const btnAtualizar =

document.getElementById(

    "btnAtualizar"

);

const totalTodos =
document.getElementById("totalTodos");

const totalRecebidos =
document.getElementById("totalRecebidos");

const totalPreparo =
document.getElementById("totalPreparo");

const totalEntrega =
document.getElementById("totalEntrega");

const totalFinalizados =
document.getElementById("totalFinalizados");

const totalCancelados =
document.getElementById("totalCancelados");

/*==================================================
ESTADO
==================================================*/

let pedidos = [];

let filtroAtual = "Todos";

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciar

);

function iniciar(){

    carregarPedidos();

    renderPedidos();

    registrarEventos();

}

/*==================================================
CARREGAR PEDIDOS
==================================================*/

function carregarPedidos(){

    pedidos = Storage.getPedidos() || [];

    pedidos.sort(

        (a,b)=>

        new Date(b.data) -

        new Date(a.data)

    );
atualizarContadores();
}

/*==================================================
RENDERIZAÇÃO
==================================================*/

function renderPedidos(){

    listaPedidos.innerHTML = "";

    if(pedidos.length===0){

        listaPedidos.innerHTML = `

        <div class="sem-pedidos">

            <i class="fa-solid fa-burger"></i>

            <h2>

                Nenhum pedido encontrado

            </h2>

            <p>

                Os pedidos aparecerão aqui automaticamente.

            </p>

        </div>

        `;

        return;

    }

    aplicarFiltros(

        pedido=>{

            listaPedidos.innerHTML +=

            criarCard(pedido);

        }

    );

}

/*==================================================
CARD
==================================================*/

function criarCard(pedido){

    return `

    <div class="pedido-card">

        <div class="pedido-topo">

            <div class="numero-pedido">

                Pedido #${pedido.id}

            </div>

            <div class="status ${classeStatus(pedido.status)}">

                ${pedido.status}

            </div>

        </div>

        <div class="pedido-info">

            <p>

                <i class="fa-solid fa-user"></i>

                ${pedido.clienteNome}

            </p>

            <p>

                <i class="fa-solid fa-phone"></i>

                ${pedido.telefone}

            </p>

            <p>

                <i class="fa-solid fa-burger"></i>

                ${pedido.itens.length} item(ns)

            </p>

        </div>

        <div class="pedido-footer">

            <div class="valor">

                ${moeda(pedido.total)}

            </div>

            <div class="tempo">

                ${tempoPedido(pedido.data)}

            </div>

        </div>

        <div class="acoes">

            <button

                class="btn-ver"

                onclick="verPedido(${pedido.id})">

                <i class="fa-solid fa-eye"></i>

                Ver

            </button>

            <button

                class="btn-status"

                onclick="alterarStatus(${pedido.id})">

                <i class="fa-solid fa-rotate"></i>

                Status

            </button>

        </div>

    </div>

    `;

}

/*==================================================
STATUS
==================================================*/

function classeStatus(status){

    switch(status){

        case "Recebido":

            return "recebido";

        case "Em preparo":

            return "preparo";

        case "Saiu para entrega":

            return "entrega";

        case "Finalizado":

            return "finalizado";

        default:

            return "cancelado";

    }

}

/*==================================================
TEMPO
==================================================*/

function tempoPedido(data){

    const agora = new Date();

    const pedido = new Date(data);

    const minutos =

        Math.floor(

            (agora-pedido)/60000

        );

    if(minutos<1){

        return "Agora";

    }

    if(minutos<60){

        return `${minutos} min`;

    }

    const horas =

        Math.floor(minutos/60);

    return `${horas} h`;

}

/*==================================================
UTILITÁRIOS
==================================================*/

function moeda(valor){

    return Number(valor)

    .toLocaleString(

        "pt-BR",

        {

            style:"currency",

            currency:"BRL"

        }

    );

}

/*==================================================
EVENTOS
==================================================*/

function registrarEventos(){

    if(pesquisaPedido){

        pesquisaPedido.addEventListener(

            "input",

            aplicarFiltros

        );

    }

    filtros.forEach(botao=>{

        botao.addEventListener(

            "click",

            ()=>{

                filtros.forEach(

                    b=>b.classList.remove(

                        "active"

                    )

                );

                botao.classList.add(

                    "active"

                );

                filtroAtual =

                botao.dataset.status;

                aplicarFiltros();

            }

        );

    });

    if(btnAtualizar){

        btnAtualizar.addEventListener(

            "click",

            ()=>{

                carregarPedidos();

                aplicarFiltros();

            }

        );

    }

}

/*==================================================
PESQUISA
==================================================*/

function aplicarFiltros(){

    const texto =

        pesquisaPedido.value

        .toLowerCase()

        .trim();

    const lista = pedidos.filter(

        pedido=>{

            const pesquisa =

                String(pedido.id)

                .includes(texto)

                ||

                (pedido.clienteNome||"")

                .toLowerCase()

                .includes(texto)

                ||

                (pedido.telefone||"")

                .includes(texto);

            const status =

                filtroAtual==="Todos"

                ||

                pedido.status===

                filtroAtual;

            return pesquisa && status;

        }

    );

    listaPedidos.innerHTML="";

    if(lista.length===0){

        listaPedidos.innerHTML=`

        <div class="sem-pedidos">

            <i class="fa-solid fa-magnifying-glass"></i>

            <h2>

                Nenhum pedido encontrado

            </h2>

            <p>

                Tente alterar os filtros.

            </p>

        </div>

        `;

        return;

    }

    lista.forEach(

        pedido=>{

            listaPedidos.innerHTML +=

            criarCard(pedido);

        }

    );

}
/*==================================================
CONTADORES
==================================================*/

function atualizarContadores(){

    totalTodos.textContent =

        pedidos.length;

    totalRecebidos.textContent =

        pedidos.filter(

            pedido=>

            pedido.status==="Recebido"

        ).length;

    totalPreparo.textContent =

        pedidos.filter(

            pedido=>

            pedido.status==="Em preparo"

        ).length;

    totalEntrega.textContent =

        pedidos.filter(

            pedido=>

            pedido.status==="Saiu para entrega"

        ).length;

    totalFinalizados.textContent =

        pedidos.filter(

            pedido=>

            pedido.status==="Finalizado"

        ).length;

    totalCancelados.textContent =

        pedidos.filter(

            pedido=>

            pedido.status==="Cancelado"

        ).length;

}
/*==================================================
AÇÕES
==================================================*/
window.verPedido=function(id){

    const pedido = pedidos.find(

        p=>p.id===id

    );

    if(!pedido){

        return;

    }

    abrirModalPedido(pedido);

}

window.alterarStatus=function(id){

    const pedido = pedidos.find(

        p=>p.id===id

    );

    if(!pedido){

        return;

    }

    switch(pedido.status){

        case "Recebido":

            pedido.status="Em preparo";

            break;

        case "Em preparo":

            pedido.status="Saiu para entrega";

            break;

        case "Saiu para entrega":

            pedido.status="Finalizado";

            break;

        default:

            return;

    }

    /*==================================
    TIMELINE
    ==================================*/

    if(!pedido.timeline){

        pedido.timeline={

            recebido:pedido.data,

            preparo:null,

            saiuEntrega:null,

            finalizado:null,

            cancelado:null

        };

    }

    if(pedido.status==="Em preparo"){

        pedido.timeline.preparo=

        Storage.dataAtual();

    }

    if(pedido.status==="Saiu para entrega"){

        pedido.timeline.saiuEntrega=

        Storage.dataAtual();

    }

    if(pedido.status==="Finalizado"){

        pedido.timeline.finalizado=

        Storage.dataAtual();

    }

    Storage.salvarPedidos(

    pedidos

);

atualizarContadores();

renderPedidos();

/*==================================================
MONITOR
==================================================*/

window.addEventListener(

    "storage",

    ()=>{

    carregarPedidos();

    atualizarContadores();

    renderPedidos();

}

);
/*==================================================
MODAL
==================================================*/

function abrirModalPedido(pedido){

    const modal =

        document.getElementById(

            "modalPedido"

        );

    const conteudo =

        document.getElementById(

            "conteudoPedido"

        );

    let itens="";

    pedido.itens.forEach(item=>{

        itens+=`

        <li>

            ${item.quantidade}x

            ${item.nome}

            -

            ${moeda(item.preco*item.quantidade)}

        </li>

        `;

    });

    conteudo.innerHTML=`

        <p>

            <strong>Pedido:</strong>

            #${pedido.id}

        </p>

        <p>

            <strong>Cliente:</strong>

            ${pedido.clienteNome}

        </p>

        <p>

            <strong>Telefone:</strong>

            ${pedido.telefone}

        </p>

        <p>

            <strong>Pagamento:</strong>

            ${pedido.pagamento}

        </p>

        <p>

            <strong>Status:</strong>

            ${pedido.status}

        </p>

        <p>

            <strong>Total:</strong>

            ${moeda(pedido.total)}

        </p>

        <hr>

        <h3>

            Itens

        </h3>

        <ul>

            ${itens}

        </ul>

        <hr>

        <p>

            <strong>Observação</strong>

        </p>

        <p>

            ${pedido.observacao || "Nenhuma"}

        </p>

    `;

    modal.style.display="flex";

}
/*==================================================
FECHAR MODAL
==================================================*/

document.addEventListener(

    "click",

    e=>{

        if(

            e.target.id==="fecharModal" ||

            e.target.id==="btnFecharModal"

        ){

            document.getElementById(

                "modalPedido"

            ).style.display="none";

        }

    }

);
/*==================================================
LOG
==================================================*/

Storage.log(

    "Central de Pedidos carregada."

);