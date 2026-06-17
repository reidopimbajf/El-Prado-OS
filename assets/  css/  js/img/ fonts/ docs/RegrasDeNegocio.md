📋 REGRAS DE NEGÓCIO

Projeto: EL PRADO OS

Versão: 0.7 Enterprise

Última atualização: 17/06/2026

⸻

Objetivo

Este documento define todas as regras funcionais do El Prado OS.

Toda funcionalidade implementada deverá obedecer às regras descritas neste documento.

⸻

CLIENTES

Cadastro

Todo cliente deverá possuir apenas um cadastro.

O telefone e o e-mail não poderão ser duplicados.

⸻

Login

O cliente poderá acessar utilizando:

* E-mail
* Telefone

A senha será obrigatória.

⸻

Sessão

O cliente permanecerá logado por até 30 dias, salvo se realizar logout.

⸻

Perfil

O cliente poderá alterar:

* Nome
* Foto
* Telefone
* Senha
* Endereços

Não poderá alterar seu histórico de pedidos.

⸻

PRODUTOS

Todo produto deverá possuir:

* Nome
* Categoria
* Descrição
* Preço
* Imagem
* Status

Nenhum produto poderá ser vendido se estiver inativo.

⸻

CATEGORIAS

Os produtos deverão ser organizados por categorias.

Exemplos:

* Burgers
* Combos
* Porções
* Bebidas
* Sobremesas
* Molhos

⸻

PROMOÇÕES

Produtos poderão ser marcados como:

* Destaque
* Promoção

Produtos em promoção poderão possuir preço promocional ou desconto percentual.

⸻

CARRINHO

O cliente poderá:

Adicionar produto

Alterar quantidade

Adicionar observações

Adicionar adicionais

Remover produtos

Aplicar cupom

Limpar carrinho

⸻

CHECKOUT

Para finalizar um pedido será obrigatório:

Cliente autenticado

Endereço válido

Forma de pagamento

Aceite dos valores apresentados

⸻

PAGAMENTO

Formas aceitas:

PIX

Cartão de Crédito

Cartão de Débito

Dinheiro

Futuramente:

Apple Pay

Google Pay

Mercado Pago

⸻

PEDIDOS

Status possíveis:

Recebido

Em análise

Em preparo

Pronto

Saiu para entrega

Entregue

Cancelado

Concluído

⸻

Após concluído:

O pedido não poderá ser alterado.

⸻

FIDELIDADE

Todo pedido concluído gera pontos.

Os pontos serão calculados conforme o valor da compra.

Os níveis serão:

Bronze

Prata

Ouro

Diamante

Cada nível poderá oferecer benefícios exclusivos.

⸻

CUPONS

Os cupons poderão ser:

Percentual

Valor fixo

Frete grátis

Brinde

Todo cupom deverá possuir validade.

⸻

DASHBOARD

O Dashboard apresentará:

Pedidos do dia

Pedidos do mês

Faturamento

Produtos mais vendidos

Clientes ativos

Ticket médio

Tempo médio de preparo

⸻

ADMINISTRADOR

O administrador poderá:

Cadastrar produtos

Editar produtos

Excluir produtos

Cadastrar promoções

Cadastrar cupons

Alterar configurações

Consultar pedidos

Consultar clientes

Emitir relatórios

⸻

FUNCIONÁRIOS (VERSÃO FUTURA)

Cada funcionário possuirá um nível de acesso.

Exemplos:

Administrador

Gerente

Atendente

Cozinha

Entregador

Cada perfil visualizará apenas as funcionalidades permitidas.

⸻

LOGS

Toda ação administrativa deverá gerar registro.

Exemplos:

Cadastro

Exclusão

Alteração

Login

Logout

Atualização de pedido

⸻

SEGURANÇA

Nenhuma senha poderá ser armazenada em texto puro na versão com backend.

Toda comunicação futura deverá utilizar HTTPS.

⸻

NOTIFICAÇÕES

O sistema deverá informar ao cliente:

Pedido recebido

Pedido em preparo

Saiu para entrega

Pedido entregue

Cupom disponível

Promoção exclusiva

⸻

RESPONSIVIDADE

Todas as funcionalidades deverão operar em:

Desktop

Notebook

Tablet

Celular

⸻

PERFORMANCE

Tempo máximo desejado para carregamento:

2 segundos.

⸻

QUALIDADE

Nenhuma funcionalidade poderá ser publicada sem:

Documentação

Teste

Homologação

Registro no CHANGELOG

⸻

EVOLUÇÃO

As regras poderão ser ampliadas conforme novas versões do sistema forem desenvolvidas.

Toda alteração deverá ser registrada no CHANGELOG e revisada antes da implementação.