/*
=========================================
EL PRADO OS
storage.js
Centralizador do LocalStorage
=========================================
*/

const Storage = {

    // ==========================
    // CHAVES
    // ==========================

    keys: {

        produtos: "produtos",

        pedidos: "pedidos",

        clientes: "clientes",

        configuracoes: "configuracoes",

        cupons: "cupons",

        promocoes: "promocoes",

        adminSession: "adminSession",

        clienteSession: "clienteSession"

    },

    // ==========================
    // MÉTODOS GENÉRICOS
    // ==========================

    get(key) {

        return JSON.parse(localStorage.getItem(key)) || [];

    },

    set(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    },

    remove(key) {

        localStorage.removeItem(key);

    },

    // ==========================
    // PRODUTOS
    // ==========================

    getProdutos() {

        return this.get(this.keys.produtos);

    },

    salvarProdutos(produtos) {

        this.set(

            this.keys.produtos,

            produtos

        );

    },

    // ==========================
    // PEDIDOS
    // ==========================

    getPedidos() {

        return this.get(this.keys.pedidos);

    },

    salvarPedidos(pedidos) {

        this.set(

            this.keys.pedidos,

            pedidos

        );

    },

    adicionarPedido(pedido) {

        const pedidos = this.getPedidos();

        pedidos.push(pedido);

        this.salvarPedidos(pedidos);

    },

    // ==========================
    // CLIENTES
    // ==========================

    getClientes() {

        return this.get(this.keys.clientes);

    },

    salvarClientes(clientes) {

        this.set(

            this.keys.clientes,

            clientes

        );

    },

    // ==========================
    // CUPONS
    // ==========================

    getCupons() {

        return this.get(this.keys.cupons);

    },

    salvarCupons(cupons) {

        this.set(

            this.keys.cupons,

            cupons

        );

    },

    // ==========================
    // PROMOÇÕES
    // ==========================

    getPromocoes() {

        return this.get(this.keys.promocoes);

    },

    salvarPromocoes(promocoes) {

        this.set(

            this.keys.promocoes,

            promocoes

        );

    },

    // ==========================
    // CONFIGURAÇÕES
    // ==========================

    getConfiguracoes() {

        const config = JSON.parse(

            localStorage.getItem(

                this.keys.configuracoes

            )

        );

        if (config) {

            return config;

        }

        return {

            empresa: "EL PRADO BURGUER",

            whatsapp: "5511975342595",

            telefone: "(11) 97534-2595",

            pedidoMinimo: 0,

            taxaEntrega: 0,

            tempoEntrega: "40 - 60 min",

            horario: "18h às 23h"

        };

    },

    salvarConfiguracoes(config) {

        localStorage.setItem(

            this.keys.configuracoes,

            JSON.stringify(config)

        );

    },

    // ==========================
    // SESSÃO ADMIN
    // ==========================

    loginAdmin() {

        const sessao = {

            logado: true,

            ultimoAcesso: Date.now()

        };

        localStorage.setItem(

            this.keys.adminSession,

            JSON.stringify(sessao)

        );

    },

    adminLogado() {

        const sessao = JSON.parse(

            localStorage.getItem(

                this.keys.adminSession

            )

        );

        if (!sessao) {

            return false;

        }

        const umaHora = 60 * 60 * 1000;

        if (

            Date.now() -

            sessao.ultimoAcesso >

            umaHora

        ) {

            this.logoutAdmin();

            return false;

        }

        sessao.ultimoAcesso = Date.now();

        localStorage.setItem(

            this.keys.adminSession,

            JSON.stringify(sessao)

        );

        return true;

    },

    logoutAdmin() {

        localStorage.removeItem(

            this.keys.adminSession

        );

    },

    // ==========================
    // SESSÃO CLIENTE
    // ==========================

    loginCliente(cliente) {

        localStorage.setItem(

            this.keys.clienteSession,

            JSON.stringify(cliente)

        );

    },

    getClienteLogado() {

        return JSON.parse(

            localStorage.getItem(

                this.keys.clienteSession

            )

        );

    },

    logoutCliente() {

        localStorage.removeItem(

            this.keys.clienteSession

        );

    },

    // ==========================
    // LIMPAR TUDO
    // ==========================

    resetSistema() {

        localStorage.clear();

    }

};