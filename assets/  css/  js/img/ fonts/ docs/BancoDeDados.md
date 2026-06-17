🗄️ BANCO DE DADOS

Projeto: EL PRADO OS

Versão: 0.7 Enterprise

⸻

Objetivo

Este documento define toda a estrutura de dados utilizada pelo sistema.

Na versão atual os dados serão armazenados em LocalStorage.

A arquitetura já será preparada para futura migração para Java Spring Boot + MySQL.

⸻

Entidades

O sistema possuirá as seguintes entidades:

* Clientes
* Produtos
* Categorias
* Pedidos
* ItensPedido
* Cupons
* Promoções
* Funcionários
* Configurações
* Fidelidade
* Logs

⸻

CLIENTES

Campos

id

nome

email

telefone

senha

foto

dataCadastro

nivel

pontos

status

enderecos[]

pedidos[]

favoritos[]

ultimoLogin

⸻

PRODUTOS

Campos

id

nome

categoria

descricao

preco

imagem

ativo

destaque

promocao

adicionais[]

estoque

tempoPreparo

dataCadastro

⸻

CATEGORIAS

id

nome

icone

ordem

ativa

⸻

ADICIONAIS

id

nome

preco

ativo

⸻

PEDIDOS

id

clienteId

numeroPedido

status

itens[]

subtotal

taxaEntrega

desconto

total

formaPagamento

troco

enderecoEntrega

observacao

dataPedido

previsaoEntrega

⸻

ITENS DO PEDIDO

id

produtoId

quantidade

precoUnitario

adicionais[]

observacao

subtotal

⸻

CUPONS

id

codigo

tipo

valor

percentual

validade

ativo

quantidadeUso

⸻

PROMOÇÕES

id

titulo

descricao

imagem

inicio

fim

ativo

⸻

FIDELIDADE

clienteId

pedidosRealizados

valorTotal

pontos

nivel

cashback

ultimoResgate

⸻

FUNCIONÁRIOS

id

nome

cargo

usuario

senha

nivelAcesso

ativo

⸻

CONFIGURAÇÕES

nomeEmpresa

telefone

whatsapp

instagram

facebook

email

logradouro

cidade

estado

cep

pedidoMinimo

taxaEntrega

tempoEntrega

horarioAbertura

horarioFechamento

pix

bannerPrincipal

⸻

LOGS

id

usuario

acao

descricao

dataHora

⸻

RELACIONAMENTOS

Cliente

↓

Pedidos

↓

ItensPedido

↓

Produtos

Produtos

↓

Categorias

Cliente

↓

Fidelidade

Cliente

↓

Endereços

Administração

↓

Logs

⸻

STORAGE

LocalStorage

clientes

produtos

categorias

pedidos

configuracoes

cupons

promocoes

funcionarios

logs

⸻

Banco Futuro

Java Spring Boot

↓

API REST

↓

MySQL

↓

Aplicativo Mobile

A estrutura foi planejada para permitir essa migração sem alteração das entidades.