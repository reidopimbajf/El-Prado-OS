/*==================================================
EL PRADO CONTROL
ADMIN-MENU.JS
VERSÃO 2.0
Responsável apenas pela interface
==================================================*/

/*==================================================
ELEMENTOS
==================================================*/

const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlayMenu");
const btnMenu = document.getElementById("btnMenu");

const paginas = document.querySelectorAll(".pagina");
const menus = document.querySelectorAll(".menu-item");

const tituloPagina =
document.getElementById("tituloPagina");

const modalProduto =
document.getElementById("modalProduto");

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(
"DOMContentLoaded",
iniciarMenu
);

function iniciarMenu(){

    configurarMenu();

    configurarMobile();

    configurarModal();

}

/*==================================================
MENU LATERAL
==================================================*/

function configurarMenu(){

    menus.forEach(menu=>{

        menu.addEventListener("click",()=>{

            abrirPagina(menu.dataset.page);

        });

    });

}

function abrirPagina(nome){

    paginas.forEach(pagina=>
        pagina.classList.remove("ativa")
    );

    menus.forEach(menu=>
        menu.classList.remove("ativo")
    );

    const pagina =
    document.getElementById(nome);

    const menu =
    document.querySelector(
        `[data-page="${nome}"]`
    );

    if(pagina){

        pagina.classList.add("ativa");

    }

    if(menu){

        menu.classList.add("ativo");

    }

    if(tituloPagina && pagina){

        const titulo =
        pagina.querySelector("h2");

        if(titulo){

            tituloPagina.textContent =
            titulo.textContent;

        }

    }

    fecharMenuMobile();

}

/*==================================================
MENU MOBILE
==================================================*/

function configurarMobile(){

    if(btnMenu){

        btnMenu.addEventListener(
            "click",
            alternarMenuMobile
        );

    }

    if(overlay){

        overlay.addEventListener(
            "click",
            fecharMenuMobile
        );

    }

}

function alternarMenuMobile(){

    sidebar.classList.toggle("ativo");

    overlay.classList.toggle("ativo");

}

function fecharMenuMobile(){

    sidebar.classList.remove("ativo");

    overlay.classList.remove("ativo");

}

/*==================================================
MODAL PRODUTO
==================================================*/

function configurarModal(){

    if(!modalProduto) return;

    modalProduto.addEventListener(
        "click",
        function(event){

            if(event.target===modalProduto){

                fecharModalProduto();

            }

        }
    );

    document.addEventListener(
        "keydown",
        function(event){

            if(
                event.key==="Escape"
                &&
                modalProduto.classList.contains("ativo")
            ){

                fecharModalProduto();

            }

        }
    );

}

function abrirModalProduto(){

    if(modalProduto){

        modalProduto.classList.add("ativo");

    }

}

function fecharModalProduto(){

    if(modalProduto){

        modalProduto.classList.remove("ativo");

    }

}

/*==================================================
API GLOBAL
==================================================*/

window.abrirPagina = abrirPagina;

window.abrirModalProduto = abrirModalProduto;

window.fecharModalProduto = fecharModalProduto;

/*==================================================
FIM
==================================================*/