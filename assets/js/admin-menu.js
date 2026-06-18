/*==================================================
EL PRADO CONTROL
ADMIN-MENU.JS
VERSÃO 1.0
==================================================*/

/*==================================================
ELEMENTOS
==================================================*/

const paginas = document.querySelectorAll(".pagina");

const menus = document.querySelectorAll(".menu-item");

const tituloPagina = document.getElementById("tituloPagina");

const sidebar = document.querySelector(".sidebar");

const overlay = document.getElementById("overlayMenu");

const btnMenu = document.getElementById("btnMenu");

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

    configurarModalProduto();

}

/*==================================================
MENU
==================================================*/

function configurarMenu(){

    menus.forEach(menu=>{

        menu.addEventListener(

            "click",

            ()=>{

                abrirPagina(

                    menu.dataset.page

                );

            }

        );

    });

}

/*==================================================
ABRIR PÁGINA
==================================================*/

function abrirPagina(nome){

    paginas.forEach(pagina=>{

        pagina.classList.remove("ativa");

    });

    menus.forEach(menu=>{

        menu.classList.remove("ativo");

    });

    const pagina = document.getElementById(nome);

    const menu = document.querySelector(

        `[data-page="${nome}"]`

    );

    if(pagina){

        pagina.classList.add("ativa");

    }

    if(menu){

        menu.classList.add("ativo");

        tituloPagina.textContent =

            menu.textContent.trim();

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

function configurarModalProduto(){

    const modal = document.getElementById(

        "modalProduto"

    );

    const abrir = document.getElementById(

        "btnNovoProduto"

    );

    const fechar = document.getElementById(

        "fecharModalProduto"

    );

    const cancelar = document.getElementById(

        "cancelarProduto"

    );

    if(abrir){

        abrir.addEventListener(

            "click",

            ()=>{

                modal.classList.add("ativo");

            }

        );

    }

    if(fechar){

        fechar.addEventListener(

            "click",

            fecharModalProduto

        );

    }

    if(cancelar){

        cancelar.addEventListener(

            "click",

            fecharModalProduto

        );

    }

    if(modal){

        modal.addEventListener(

            "click",

            event=>{

                if(event.target===modal){

                    fecharModalProduto();

                }

            }

        );

    }

    document.addEventListener(

        "keydown",

        event=>{

            if(

                event.key==="Escape"

                &&

                modal.classList.contains("ativo")

            ){

                fecharModalProduto();

            }

        }

    );

}

function fecharModalProduto(){

    const modal = document.getElementById(

        "modalProduto"

    );

    if(modal){

        modal.classList.remove("ativo");

    }

}

/*==================================================
API PÚBLICA
==================================================*/

window.abrirPagina = abrirPagina;

/*==================================================
FIM
==================================================*/