/*
=========================================
EL PRADO OS
home.js
Home dinâmica
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    carregarCategorias();
    carregarPromocoes();
    carregarDestaques();

});

// =============================
// CARREGAR PRODUTOS
// =============================

function getProdutos() {

    return Storage.getProdutos();

}

// =============================
// CATEGORIAS
// =============================

function carregarCategorias() {

    const container = document.getElementById("listaCategorias");

    if (!container) return;

    const produtos = getProdutos();

    const categorias = [...new Set(produtos.map(p => p.categoria))];

    if (categorias.length === 0) {

        container.innerHTML = `
            <p style="text-align:center;width:100%;">
                Nenhuma categoria cadastrada.
            </p>
        `;

        return;

    }

    container.innerHTML = "";

    categorias.forEach(categoria => {

        container.innerHTML += `

        <div class="categoria-card">

            <h3>${iconeCategoria(categoria)}</h3>

            <span>${capitalizar(categoria)}</span>

        </div>

        `;

    });

}

// =============================
// PROMOÇÕES
// =============================

function carregarPromocoes() {

    const container = document.getElementById("listaPromocoes");

    if (!container) return;

    const produtos = getProdutos().filter(produto => produto.promocao);

    if (produtos.length === 0) {

        container.innerHTML = `

        <div class="promo">

            <h3>

                Em breve

            </h3>

            <p>

                Nenhuma promoção cadastrada.

            </p>

        </div>

        `;

        return;

    }

    container.innerHTML = "";

    produtos.forEach(produto => {

        container.innerHTML += `

        <div class="promo">

            <h3>

                ${produto.nome}

            </h3>

            <p>

                ${produto.descricao}

            </p>

            <span>

                R$ ${produto.preco.toFixed(2)}

            </span>

        </div>

        `;

    });

}

// =============================
// DESTAQUES
// =============================

function carregarDestaques() {

    const container = document.getElementById("listaDestaques");

    if (!container) return;

    const produtos = getProdutos().filter(produto => produto.destaque);

    if (produtos.length === 0) {

        container.innerHTML = `

        <p style="text-align:center;width:100%;">

            Nenhum produto em destaque.

        </p>

        `;

        return;

    }

    container.innerHTML = "";

    produtos.forEach(produto => {

        container.innerHTML += `

        <div class="produto">

            <img src="${produto.imagem}" alt="${produto.nome}">

            <h3>

                ${produto.nome}

            </h3>

            <p>

                ${produto.descricao}

            </p>

            <span>

                R$ ${produto.preco.toFixed(2)}

            </span>

            <a href="cardapio.html">

                Pedir Agora

            </a>

        </div>

        `;

    });

}

// =============================
// UTILIDADES
// =============================

function capitalizar(texto) {

    return texto.charAt(0).toUpperCase() + texto.slice(1);

}

function iconeCategoria(categoria) {

    switch (categoria) {

        case "burger":
            return "🍔";

        case "combo":
            return "🔥";

        case "bebida":
            return "🥤";

        case "porcao":
            return "🍟";

        case "sobremesa":
            return "🍰";

        default:
            return "📦";

    }

}