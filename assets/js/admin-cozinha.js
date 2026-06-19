"use strict";

const painel =

document.getElementById(

    "painelCozinha"

);

let pedidos=[];

document.addEventListener(

    "DOMContentLoaded",

    iniciar

);

function iniciar(){

    carregarPedidos();

}