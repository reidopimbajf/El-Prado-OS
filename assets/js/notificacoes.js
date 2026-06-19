/*==================================================
 EL PRADO BURGUER
 CENTRAL DE NOTIFICAÇÕES
==================================================*/

"use strict";

const Notificacoes={

    mensagens:{

        Recebido:

`🍔 *El Prado Burguer*

Olá {cliente}!

Recebemos seu pedido *#{pedido}*.

Nossa equipe já iniciou o atendimento.

Obrigado pela preferência! ❤️`,

        "Em preparo":

`👨🏻‍🍳 *El Prado Burguer*

Olá {cliente}!

Seu hambúrguer já está sendo preparado.

Em breve seguirá para entrega. 🔥`,

        "Saiu para entrega":

`🛵 *El Prado Burguer*

Olá {cliente}!

Seu pedido saiu para entrega.

Já já ele estará na sua porta. 🚀`,

        Finalizado:

`✅ *El Prado Burguer*

Pedido entregue!

Esperamos que tenha gostado.

Obrigado pela preferência ❤️`,

        Cancelado:

`⚠️ *El Prado Burguer*

Infelizmente seu pedido foi cancelado.

Caso tenha dúvidas fale conosco.`
    },

    gerar(status,pedido){

        let texto=

        this.mensagens[status] ||

        "";

        texto=

        texto.replace(

            "{cliente}",

            pedido.clienteNome

        );

        texto=

        texto.replace(

            "{pedido}",

            pedido.id

        );

        return texto;

    }

};
