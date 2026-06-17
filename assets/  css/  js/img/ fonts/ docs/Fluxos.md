🔄 FLUXOS DO SISTEMA

Projeto: EL PRADO OS

Versão: 0.7 Enterprise

Última atualização: 17/06/2026

⸻

Objetivo

Este documento descreve todos os fluxos oficiais do El Prado OS.

Nenhuma funcionalidade poderá ser implementada sem possuir um fluxo definido.

⸻

FLUXO 1 — PRIMEIRO ACESSO

Cliente

↓

Acessa o site

↓

Visualiza a Home

↓

Visualiza produtos em destaque

↓

Escolhe uma categoria

↓

Pode navegar livremente

↓

Ao tentar finalizar um pedido

↓

Sistema solicita Login ou Cadastro

↓

Cliente realiza o cadastro

↓

Retorna automaticamente ao Checkout

⸻

FLUXO 2 — LOGIN

Cliente

↓

Tela de Login

↓

Informa e-mail ou telefone

↓

Senha

↓

Entrar

↓

Sistema valida credenciais

↓

Sessão iniciada

↓

Redireciona para Home

⸻

FLUXO 3 — CADASTRO

Cliente

↓

Nome

↓

Telefone

↓

E-mail

↓

Senha

↓

Confirmar senha

↓

Cadastrar

↓

Sistema cria cliente

↓

Login automático

↓

Home

⸻

FLUXO 4 — CARDÁPIO

Cliente

↓

Seleciona categoria

↓

Visualiza produtos

↓

Seleciona produto

↓

Visualiza detalhes

↓

Escolhe adicionais

↓

Quantidade

↓

Observações

↓

Adicionar ao carrinho

⸻

FLUXO 5 — CARRINHO

Cliente

↓

Visualiza itens

↓

Editar quantidade

↓

Remover item

↓

Adicionar cupom

↓

Continuar comprando

↓

Finalizar pedido

⸻

FLUXO 6 — CHECKOUT

Cliente

↓

Seleciona endereço

↓

Forma de pagamento

↓

PIX

Cartão

Dinheiro

↓

Confirma pedido

↓

Pedido criado

↓

Status “Recebido”

↓

Mensagem enviada ao WhatsApp

⸻

FLUXO 7 — PEDIDO

Pedido criado

↓

Novo Pedido

↓

Em Análise

↓

Em Preparo

↓

Saiu para Entrega

↓

Entregue

↓

Concluído

↓

Atualizar Fidelidade

⸻

FLUXO 8 — FIDELIDADE

Pedido concluído

↓

Somar pontos

↓

Atualizar nível

↓

Verificar recompensa

↓

Disponibilizar cupom

↓

Cliente recebe notificação

⸻

FLUXO 9 — ADMINISTRADOR

Login

↓

Dashboard

↓

Produtos

↓

Pedidos

↓

Clientes

↓

Promoções

↓

Cupons

↓

Relatórios

↓

Configurações

↓

Logout

⸻

FLUXO 10 — PRODUTOS

Admin

↓

Novo Produto

↓

Categoria

↓

Preço

↓

Imagem

↓

Salvar

↓

Produto disponível imediatamente

↓

Atualiza Home

↓

Atualiza Cardápio

⸻

FLUXO 11 — PEDIDOS

Novo Pedido

↓

Painel Administrativo

↓

Painel da Cozinha

↓

Aceitar Pedido

↓

Em Preparo

↓

Pedido Pronto

↓

Saiu para Entrega

↓

Entregue

↓

Concluído

⸻

FLUXO 12 — DASHBOARD

Administrador

↓

Visualiza indicadores

↓

Pedidos do dia

↓

Faturamento

↓

Clientes

↓

Produtos vendidos

↓

Ticket médio

↓

Relatórios

⸻

FLUXO 13 — CONFIGURAÇÕES

Administrador

↓

Informações da empresa

↓

Horários

↓

WhatsApp

↓

PIX

↓

Taxa de entrega

↓

Pedido mínimo

↓

Salvar

↓

Atualização imediata no sistema

⸻

FLUXO FUTURO

Aplicativo

↓

API REST

↓

Painel Motoboy

↓

Pagamento Online

↓

Notificações Push

↓

Multiempresa

⸻

REGRAS

Todo fluxo deverá possuir:

• Início

• Processo

• Finalização

• Tratamento de erro

• Mensagens ao usuário

• Registro em Log

Nenhuma funcionalidade será desenvolvida sem um fluxo previamente documentado.

⸻

OBSERVAÇÃO

Este documento será atualizado a cada nova Sprint do El Prado OS.