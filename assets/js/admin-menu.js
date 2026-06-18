/*==================================================
EL PRADO CONTROL
ADMIN-MENU.JS
VERSÃO 2.0
Responsável apenas pela interface
==================================================*/

/*==================================================
ELEMENTOS
==================================================*/

let paginas = [];
let menus = [];
let tituloPagina;
let sidebar;
let overlay;
let btnMenu;
let modalProduto;


/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(
    "DOMContentLoaded",
    iniciarMenu
);

function iniciarMenu(){

    tituloPagina =
    document.getElementById("tituloPagina");

    sidebar =
    document.querySelector(".sidebar");

    overlay =
    document.getElementById("overlayMenu");

    btnMenu =
    document.getElementById("btnMenu");

    modalProduto =
    document.getElementById("modalProduto");

    paginas =
    document.querySelectorAll(".pagina");

    menus =
    document.querySelectorAll(".menu-item");

    configurarMenuLateral();

    configurarMenuMobile();

    configurarModal();

}
/*==================================================
MENU LATERAL
==================================================*/

function configurarMenuLateral(){

    menus.forEach(menu=>{

        menu.onclick = function(){

            abrirPagina(menu.dataset.page);

        };

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

    const pagina =
    document.getElementById(nome);

    const menu =
    document.querySelector(
        `.menu-item[data-page="${nome}"]`
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

function configurarMenuMobile(){

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

    modalProduto.addEventListener("click",(event)=>{

        if(event.target===modalProduto){

            if(typeof fecharModalProduto==="function"){

                fecharModalProduto();

            }

        }

    });

    document.addEventListener("keydown",(event)=>{

        if(event.key==="Escape"){

            if(modalProduto.classList.contains("ativo")){

                if(typeof fecharModalProduto==="function"){

                    fecharModalProduto();

                }

            }

        }

    });

}

/*==================================================
API PÚBLICA
==================================================*/

window.abrirPagina = abrirPagina;

/*==================================================
FIM
==================================================*/