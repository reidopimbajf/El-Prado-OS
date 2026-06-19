/*==================================================
 EL PRADO BURGUER
 admin-login.js
 ProdControl
==================================================*/

"use strict";

/*==================================================
CACHE
==================================================*/

const formLogin =
document.getElementById("formLoginAdmin");

/*==================================================
USUÁRIO PADRÃO
==================================================*/

const USUARIO = "admin";

const SENHA = "prado123";

/*==================================================
INICIALIZAÇÃO
==================================================*/

document.addEventListener(

    "DOMContentLoaded",

    iniciar

);

function iniciar(){

    if(formLogin){

        formLogin.addEventListener(

            "submit",

            realizarLogin

        );

    }

}

/*==================================================
LOGIN
==================================================*/

function realizarLogin(e){

    e.preventDefault();

    const usuario =

        document.getElementById("usuario")

        .value

        .trim();

    const senha =

        document.getElementById("senha")

        .value;

    if(

        usuario !== USUARIO ||

        senha !== SENHA

    ){

        alert(

            "Usuário ou senha inválidos."

        );

        return;

    }

    localStorage.setItem(

        "adminLogado",

        "true"

    );

    window.location.href =

    "admin-dashboard.html";

}