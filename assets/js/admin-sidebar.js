/*==================================================
 EL PRADO BURGUER
 ADMIN SIDEBAR
 ProdControl V2
==================================================*/

"use strict";

document.addEventListener(

    "DOMContentLoaded",

    carregarSidebar

);

function carregarSidebar(){

    const sidebar =

    document.getElementById(

        "sidebar"

    );

    if(!sidebar){

        return;

    }

    sidebar.innerHTML = `

    <div class="sidebar-logo">

        <img
        src="../assets/img/logo.png"
        alt="Logo">

        <h2>

            ProdControl

        </h2>

    </div>

    <nav class="sidebar-menu">

        <a href="admin-dashboard.html">

            <i class="fa-solid fa-chart-line"></i>

            Dashboard

        </a>

        <a href="admin-pedidos.html">

            <i class="fa-solid fa-bag-shopping"></i>

            Pedidos

            <span
            id="contadorPedidos"
            class="menu-badge">

            </span>

        </a>

        <a href="admin-produtos.html">

            <i class="fa-solid fa-burger"></i>

            Produtos

        </a>

        <a href="admin-clientes.html">

            <i class="fa-solid fa-users"></i>

            Clientes

        </a>

        <a href="admin-relatorios.html">

            <i class="fa-solid fa-chart-column"></i>

            Relatórios

        </a>

        <a href="admin-cozinha.html">

            <i class="fa-solid fa-kitchen-set"></i>

            Cozinha

        </a>

        <a href="admin-configuracoes.html">

            <i class="fa-solid fa-gear"></i>

            Configurações

        </a>

    </nav>

    <div class="sidebar-footer">

        <button
        id="btnLogout">

            <i class="fa-solid fa-right-from-bracket"></i>

            Sair

        </button>

    </div>

    `;

    marcarPaginaAtual();

    atualizarBadgePedidos();

    registrarEventos();

}