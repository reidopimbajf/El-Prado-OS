🏗️ ARQUITETURA DO SISTEMA

Projeto: El Prado OS

Versão: 0.7 Enterprise

Última atualização: 17/06/2026

⸻

Objetivo

Este documento define a arquitetura oficial do El Prado OS.

Toda funcionalidade desenvolvida deverá respeitar esta estrutura para garantir organização, escalabilidade e facilidade de manutenção.

⸻

Arquitetura Geral

O sistema será dividido em módulos independentes.

Cada módulo possuirá apenas uma responsabilidade.

Cliente
↓
Home
↓
Cardápio
↓
Carrinho
↓
Checkout
↓
Pedido
↓
Administração
↓
Dashboard
↓
Relatórios

⸻

Estrutura Oficial

EL-PRADO-OS/
assets/
css/
js/
img/
fonts/
docs/
backups/
index.html
cardapio.html
cliente.html
admin.html

⸻

Camadas

Camada de Apresentação

Responsável pela interface do usuário.

Arquivos:

* index.html
* cardapio.html
* cliente.html
* admin.html

CSS:

* style.css
* cardapio.css
* cliente.css
* admin.css

⸻

Camada de Lógica

Responsável pelas regras do sistema.

Arquivos:

* home.js
* produtos.js
* carrinho.js
* checkout.js
* pedidos.js
* clientes.js
* admin.js

⸻

Camada de Dados

Responsável pelo armazenamento.

Inicialmente:

LocalStorage

Futuramente:

MySQL

⸻

Organização dos módulos

config.js

Configurações gerais do sistema.

Exemplo:

* Nome da empresa
* WhatsApp
* Horário
* Taxa de entrega
* Pedido mínimo

⸻

storage.js

Toda comunicação com o LocalStorage.

Nenhum outro arquivo deverá acessar o LocalStorage diretamente.

⸻

utils.js

Funções reutilizáveis.

Exemplos:

* Formatação de moeda
* Datas
* Máscaras
* Geração de IDs
* Validações

⸻

home.js

Responsável apenas pela Home.

⸻

produtos.js

Cadastro

Edição

Pesquisa

Categorias

Promoções

Disponibilidade

⸻

carrinho.js

Adicionar produtos

Remover

Quantidade

Observações

Adicionais

Total

⸻

checkout.js

Cliente

Endereço

Pagamento

Cupom

Resumo

Finalização

⸻

pedidos.js

Criar pedido

Atualizar status

Cancelar

Histórico

Dashboard

⸻

clientes.js

Cadastro

Login

Sessão

Perfil

Endereços

Fidelidade

⸻

admin.js

Dashboard

Produtos

Pedidos

Clientes

Configurações

Relatórios

⸻

Comunicação

Todos os módulos deverão se comunicar apenas através das funções públicas.

Nenhum módulo poderá alterar diretamente os dados internos de outro módulo.

⸻

Banco de Dados

Modelo inicial

LocalStorage

Modelo futuro

Spring Boot

↓

API REST

↓

MySQL

A arquitetura já será preparada para essa migração.

⸻

Organização Visual

Todos os componentes deverão seguir o Design System.

Nenhuma tela poderá criar estilos próprios sem necessidade.

⸻

Performance

Objetivos:

* Carregamento rápido
* Código modular
* Reutilização máxima
* Poucas duplicações
* Responsividade

⸻

Segurança

Na versão atual:

Sessão via LocalStorage.

Na versão futura:

JWT

Spring Security

Criptografia de senhas

⸻

Escalabilidade

A arquitetura deverá permitir futuras implementações como:

* Aplicativo Android
* Aplicativo iOS
* API Pública
* Multiempresa
* Multiunidade
* Integrações com pagamentos
* Impressão automática
* Painel do entregador

Sem necessidade de reescrever o sistema.

⸻

Padrões

Cada arquivo deverá possuir apenas uma responsabilidade.

Nenhuma função poderá executar tarefas de módulos diferentes.

Todo código deverá ser reutilizável.

Toda alteração deverá ser documentada.

⸻

Objetivo Final

Ao final da versão 1.0, o El Prado OS deverá possuir uma arquitetura sólida, preparada para evoluir continuamente sem necessidade de reconstrução.