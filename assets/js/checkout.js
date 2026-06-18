/*==================================================
 EL PRADO BURGUER
 CHECKOUT.JS
==================================================*/

document.addEventListener("DOMContentLoaded", iniciarCheckout);

/*==================================================
 INICIAR
==================================================*/

let carrinho = [];

function iniciarCheckout(){

    carrinho = obterCarrinho();

    carregarResumo();

    configurarEventos();

}

/*==================================================
 EVENTOS
==================================================*/

function configurarEventos(){

    const cep = document.getElementById("cep");

    if(cep){

        cep.addEventListener("blur", buscarCEP);

    }

    const botao = document.getElementById("btnFinalizar");

    if(botao){

        botao.addEventListener("click", finalizarPedido);

    }

}

/*==================================================
 RESUMO
==================================================*/

function carregarResumo(){

    const lista = document.getElementById("listaResumo");

    const subtotal = document.getElementById("subtotal");

    const total = document.getElementById("totalPedido");

    if(!lista){

        return;

    }

    lista.innerHTML = "";

    let valorTotal = 0;

    carrinho.forEach(item=>{

        const totalItem = item.preco * item.quantidade;

        valorTotal += totalItem;

        lista.innerHTML += `

<div class="item-resumo">

<div>

<h4>

${item.nome}

</h4>

<p>

${item.quantidade} x R$ ${item.preco.toFixed(2).replace(".",",")}

</p>

</div>

<strong>

R$ ${totalItem.toFixed(2).replace(".",",")}

</strong>

</div>

`;

    });

    subtotal.textContent =
    `R$ ${valorTotal.toFixed(2).replace(".",",")}`;

    total.textContent =
    `R$ ${valorTotal.toFixed(2).replace(".",",")}`;

}
/*==================================================
 VIA CEP
==================================================*/

async function buscarCEP(){

    const cep = document
        .getElementById("cep")
        .value
        .replace(/\D/g,"");

    if(cep.length !== 8){

        return;

    }

    try{

        const resposta = await fetch(

            `https://viacep.com.br/ws/${cep}/json/`

        );

        const endereco = await resposta.json();

        if(endereco.erro){

            alert("CEP não encontrado.");

            return;

        }

        document.getElementById("endereco").value =
            endereco.logradouro || "";

        document.getElementById("bairro").value =
            endereco.bairro || "";

        document.getElementById("cidade").value =
            endereco.localidade || "";

    }catch(erro){

        console.error(erro);

        alert("Erro ao consultar o CEP.");

    }

}

/*==================================================
 VALIDAÇÃO
==================================================*/

function validarFormulario(){

    const obrigatorios = [

        "nome",

        "telefone",

        "cep",

        "endereco",

        "numero",

        "bairro",

        "cidade"

    ];

    for(const campo of obrigatorios){

        const elemento = document.getElementById(campo);

        if(!elemento.value.trim()){

            alert(

                "Preencha o campo: " +

                campo

            );

            elemento.focus();

            return false;

        }

    }

    if(carrinho.length===0){

        alert(

            "Seu carrinho está vazio."

        );

        return false;

    }

    return true;

}

/*==================================================
 DADOS DO PEDIDO
==================================================*/

function obterEntrega(){

    return document.querySelector(

        "input[name='entrega']:checked"

    ).value;

}

function obterPagamento(){

    return document.querySelector(

        "input[name='pagamento']:checked"

    ).value;

}
/*==================================================
 FINALIZAR PEDIDO
==================================================*/

function finalizarPedido(){

    if(!validarFormulario()){

        return;

    }

    const pedido = {

        id:Date.now(),

        data:new Date().toLocaleString("pt-BR"),

        cliente:{

            nome:document.getElementById("nome").value,

            telefone:document.getElementById("telefone").value,

            cep:document.getElementById("cep").value,

            endereco:document.getElementById("endereco").value,

            numero:document.getElementById("numero").value,

            complemento:document.getElementById("complemento").value,

            bairro:document.getElementById("bairro").value,

            cidade:document.getElementById("cidade").value,

            observacoes:document.getElementById("observacoes").value

        },

        entrega:obterEntrega(),

        pagamento:obterPagamento(),

        itens:carrinho,

        total:calcularTotal()

    };

    const pedidos = obterPedidos();

    pedidos.push(pedido);

    salvarPedidos(pedidos);

    enviarWhatsApp(pedido);

}

/*==================================================
 TOTAL
==================================================*/

function calcularTotal(){

    return carrinho.reduce(

        (total,item)=>

        total + (item.preco * item.quantidade),

        0

    );

}

/*==================================================
 WHATSAPP
==================================================*/

function enviarWhatsApp(pedido){

    let mensagem =

`🍔 *NOVO PEDIDO - EL PRADO BURGUER*

👤 *Cliente:*
${pedido.cliente.nome}

📱 *Telefone:*
${pedido.cliente.telefone}

📍 *Endereço:*
${pedido.cliente.endereco}, ${pedido.cliente.numero}
${pedido.cliente.bairro}
${pedido.cliente.cidade}

🚚 *Entrega:*
${pedido.entrega}

💳 *Pagamento:*
${pedido.pagamento}

--------------------------------

🍔 *ITENS*`;

    pedido.itens.forEach(item=>{

        mensagem +=

`

• ${item.quantidade}x ${item.nome}

R$ ${(item.preco * item.quantidade).toFixed(2).replace(".",",")}`;

    });

    mensagem +=

`

--------------------------------

💰 *TOTAL*

R$ ${pedido.total.toFixed(2).replace(".",",")}

📝 *Observações*

${pedido.cliente.observacoes || "Nenhuma"}

Obrigado pela preferência ❤️`;

    const numero =

"5511975342595";

    const url =

`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    limparCarrinho();

    window.open(url,"_blank");

    alert(

"Pedido enviado com sucesso!"

    );

    window.location.href="../index.html";

}