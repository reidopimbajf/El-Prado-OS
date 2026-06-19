"use strict";

const painel =

document.getElementById(

    "painelCozinha"

);

let pedidos=[];

document.addEventListener(

    "DOMContentLoaded",

    iniciar

);

function iniciar(){

    carregarPedidos();

}
/*==================================================
CARREGAR PEDIDOS
==================================================*/

function carregarPedidos(){

    pedidos = Storage.getPedidos() || [];

    pedidos = pedidos.filter(

        pedido =>

        pedido.status === "Recebido" ||

        pedido.status === "Em preparo"

    );

    renderizarPedidos();

}

/*==================================================
RENDERIZAÇÃO
==================================================*/

function renderizarPedidos(){

    painel.innerHTML = "";

    if(pedidos.length === 0){

        painel.innerHTML = `

        <div class="cozinha-vazia">

            <i class="fa-solid fa-burger"></i>

            <h2>

                Nenhum pedido aguardando preparo

            </h2>

        </div>

        `;

        return;

    }

    pedidos.forEach(pedido=>{

        painel.innerHTML += criarCard(pedido);

    });

}

/*==================================================
CARD
==================================================*/

function criarCard(pedido){

    let itens = "";

    pedido.itens.forEach(item=>{

        itens += `

        <li>

            <strong>${item.quantidade}x</strong>

            ${item.nome}

        </li>

        `;

    });

    return `

<div class="card-cozinha ${classePrioridade(pedido.data)}">

        <div class="card-topo">

            <span>

                Pedido #${pedido.id}

            </span>

          <div>

<span class="status">

${pedido.status}

</span>

<div class="cronometro">

⏱ ${tempoDecorrido(pedido.data)}

</div>

</div>

        </div>

        <h2>

            ${pedido.clienteNome}

        </h2>

        <ul>

            ${itens}

        </ul>

        <div class="observacao">

            <strong>Observação</strong>

            <p>

                ${pedido.observacao || "Nenhuma"}

            </p>

        </div>

${pedido.status==="Recebido"

?`

<button

class="btn-cozinha"

onclick="iniciarPreparo(${pedido.id})">

👨🏻‍🍳 Iniciar preparo

</button>

`

:`

<button

class="btn-pronto"

onclick="finalizarPreparo(${pedido.id})">

✅ Pedido pronto

</button>

`

}

    </div>

    `;

}/*==================================================
INICIAR PREPARO
==================================================*/

window.iniciarPreparo = function(id){

    const pedido = pedidos.find(

        p => p.id === id

    );

    if(!pedido){

        return;

    }

    pedido.status = "Em preparo";

    if(!pedido.timeline){

        pedido.timeline = {

            recebido:pedido.data,

            preparo:null,

            saiuEntrega:null,

            finalizado:null,

            cancelado:null

        };

    }

    pedido.timeline.preparo =

        Storage.dataAtual();

    const todosPedidos =

        Storage.getPedidos();

    const indice =

        todosPedidos.findIndex(

            p => p.id === id

        );

    if(indice !== -1){

        todosPedidos[indice] = pedido;

        Storage.salvarPedidos(

            todosPedidos

        );

    }

    carregarPedidos();

};
/*==================================================
PEDIDO PRONTO
==================================================*/

window.finalizarPreparo = function(id){

    const pedido = pedidos.find(

        p => p.id === id

    );

    if(!pedido){

        return;

    }

    pedido.status =

        "Saiu para entrega";

    pedido.timeline =

        pedido.timeline || {};

    pedido.timeline.saiuEntrega =

        Storage.dataAtual();

    const lista =

        Storage.getPedidos();

    const indice =

        lista.findIndex(

            p => p.id === id

        );

    if(indice !== -1){

        lista[indice] = pedido;

        Storage.salvarPedidos(

            lista

        );

    }

    carregarPedidos();

    if(

        typeof Notificacoes !== "undefined"

    ){

        console.log(

            Notificacoes.gerar(

                pedido.status,

                pedido

            )

        );

    }

};
/*==================================================
PRIORIDADE
==================================================*/

function classePrioridade(data){

    const minutos =

        Math.floor(

            (new Date() - new Date(data))

            /60000

        );

    if(minutos < 10){

        return "prioridade-verde";

    }

    if(minutos < 20){

        return "prioridade-amarela";

    }

    return "prioridade-vermelha";

}

/*==================================================
CRONÔMETRO
==================================================*/

function tempoDecorrido(data){

    const segundos =

        Math.floor(

            (new Date()-new Date(data))

            /1000

        );

    const minutos =

        Math.floor(segundos/60);

    const resto =

        segundos % 60;

    return `${String(minutos).padStart(2,"0")}:${String(resto).padStart(2,"0")}`;

}
/*==================================================
AUTO UPDATE
==================================================*/

window.addEventListener(

    "storage",

    ()=>{

        carregarPedidos();

if(

    typeof Notificacoes !== "undefined"

){

    console.log(

        Notificacoes.gerar(

            pedido.status,

            pedido

        )

    );


    }

);
/*==================================================
ATUALIZA TEMPOS
==================================================*/

setInterval(()=>{

    carregarPedidos();

},1000);