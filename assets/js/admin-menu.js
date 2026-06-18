/*==================================================
EL PRADO CONTROL
ADMIN-MENU.JS
VERSÃO 2.0
Responsável apenas pelo MENU MOBILE
==================================================*/

const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlayMenu");
const btnMenu = document.getElementById("btnMenu");

document.addEventListener("DOMContentLoaded", () => {

    if(btnMenu){

        btnMenu.addEventListener("click", alternarMenuMobile);

    }

    if(overlay){

        overlay.addEventListener("click", fecharMenuMobile);

    }

});

function alternarMenuMobile(){

    sidebar.classList.toggle("ativo");

    overlay.classList.toggle("ativo");

}

function fecharMenuMobile(){

    sidebar.classList.remove("ativo");

    overlay.classList.remove("ativo");

}