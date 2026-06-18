/*==================================================
EL PRADO OS
ADMIN-MENU.JS
VERSÃO 3.0
Responsável apenas pela interface
==================================================*/

"use strict";

/*==================================================
ELEMENTOS
==================================================*/

const Menu = {

    paginas: [],

    itens: [],

    sidebar: null,

    overlay: null,

    btnMenu: null,

    titulo: null,

    modalProduto: null

};

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciarMenu

);

function iniciarMenu(){

    Menu.paginas =
    document.querySelectorAll(".pagina");

    Menu.itens =
    document.querySelectorAll(".menu-item");

    Menu.sidebar =
    document.querySelector(".sidebar");

    Menu.overlay =
    document.getElementById("overlayMenu");

    Menu.btnMenu =
    document.getElementById("btnMenu");

    Menu.titulo =
    document.getElementById("tituloPagina");

    Menu.modalProduto =
    document.getElementById("modalProduto");

    configurarMenu();

    configurarMobile();

    configurarModal();

    abrirPagina("dashboard");

}
/*==================================================
MENU LATERAL
==================================================*/

function configurarMenu(){

    Menu.itens.forEach(item=>{

        item.addEventListener(

            "click",

            function(){

                abrirPagina(

                    this.dataset.page

                );

            }

        );

    });

}

/*==================================================
ABRIR PÁGINA
==================================================*/

function abrirPagina(nome){

    Menu.paginas.forEach(pagina=>{

        pagina.classList.remove("ativa");

    });

    Menu.itens.forEach(item=>{

        item.classList.remove("ativo");

    });

    const pagina =

        document.getElementById(nome);

    const item =

        document.querySelector(

            `.menu-item[data-page="${nome}"]`

        );

    if(pagina){

        pagina.classList.add("ativa");

    }

    if(item){

        item.classList.add("ativo");

    }

    atualizarTitulo(nome);

    fecharMenuMobile();

}
/*==================================================
TÍTULO DA PÁGINA
==================================================*/

function atualizarTitulo(nome){

    if(!Menu.titulo){

        return;

    }

    const pagina = document.getElementById(nome);

    if(!pagina){

        return;

    }

    const titulo = pagina.querySelector("h2");

    if(titulo){

        Menu.titulo.textContent =

        titulo.textContent;

    }

}

/*==================================================
MENU MOBILE
==================================================*/

function configurarMobile(){

    if(Menu.btnMenu){

        Menu.btnMenu.addEventListener(

            "click",

            alternarMenuMobile

        );

    }

    if(Menu.overlay){

        Menu.overlay.addEventListener(

            "click",

            fecharMenuMobile

        );

    }

}

function alternarMenuMobile(){

    if(Menu.sidebar){

        Menu.sidebar.classList.toggle(

            "ativo"

        );

    }

    if(Menu.overlay){

        Menu.overlay.classList.toggle(

            "ativo"

        );

    }

}

function fecharMenuMobile(){

    if(Menu.sidebar){

        Menu.sidebar.classList.remove(

            "ativo"

        );

    }

    if(Menu.overlay){

        Menu.overlay.classList.remove(

            "ativo"

        );

    }

}/*==================================================
MODAL PRODUTO
==================================================*/

function configurarModal(){

    if(!Menu.modalProduto){

        return;

    }

    Menu.modalProduto.addEventListener(

        "click",

        function(event){

            if(event.target===Menu.modalProduto){

                if(typeof fecharModalProduto==="function"){

                    fecharModalProduto();

                }

            }

        }

    );

    document.addEventListener(

        "keydown",

        function(event){

            if(

                event.key==="Escape"

                &&

                Menu.modalProduto.classList.contains("ativo")

            ){

                if(typeof fecharModalProduto==="function"){

                    fecharModalProduto();

                }

            }

        }

    );

}

/*==================================================
API PÚBLICA
==================================================*/

window.abrirPagina = abrirPagina;

window.fecharMenuMobile = fecharMenuMobile;

window.alternarMenuMobile = alternarMenuMobile;

/*==================================================
LOG
==================================================*/

console.log(

    "%cEL PRADO OS",

    "color:#D4AF37;font-size:15px;font-weight:bold;"

);

console.log(

    "Admin Menu V3 carregado."

);

/*==================================================
FIM DO ARQUIVO
ADMIN-MENU.JS V3.0
==================================================*/