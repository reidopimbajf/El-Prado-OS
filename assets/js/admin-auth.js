/*==================================================
 EL PRADO BURGUER
 ADMIN AUTH
 ProdControl V2
==================================================*/

"use strict";

/*==================================================
VERIFICAÇÃO
==================================================*/

(function(){

    if(

        !Storage.adminEstaLogado()

    ){

        window.location.href =

        "admin.html";

        return;

    }

})();

/*==================================================
ADMIN LOGADO
==================================================*/

const Admin =

Storage.getAdmin();

/*==================================================
LOGOUT
==================================================*/

function logoutAdmin(){

    Storage.logoutAdmin();

    window.location.href =

    "admin.html";

}