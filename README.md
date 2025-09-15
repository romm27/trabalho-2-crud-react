# COH2 Replay Hub

## Descrição

**COH2 Replay Hub** é um sistema web completo, desenvolvido como um projeto acadêmico individual. A aplicação permite que usuários façam o upload, visualizem, editem e deletem replays do jogo Company of Heroes 2. O sistema foi construído utilizando React no frontend, Node.js com Express no backend e MySQL como banco de dados, implementando todas as operações de um CRUD funcional.

Uma característica notável do projeto é o parser no backend que lê o cabeçalho do arquivo binário `.rec` no momento do upload para extrair automaticamente metadados como o nome do mapa e o modo de jogo (1v1, 2v2, etc.), populando o banco de dados de forma inteligente e permitindo uma experiência de usuário mais rica e dinâmica.

**Autor: Giovanni Strasser**

## Tecnologias Utilizadas

*   **Frontend:** React (criado com Vite), CSS moderno (Flexbox, Grid, Variáveis CSS)
*   **Backend:** Node.js, Express.js
*   **Banco de Dados:** MySQL
*   **Bibliotecas Adicionais:**
    *   `multer` para o upload de arquivos no backend.
    *   `mysql2` para a conexão com o banco de dados.
    *   `cors` para permitir a comunicação entre frontend e backend.

## Funcionalidades Implementadas

*   **CRUD Completo:**
    *   **Create:** Upload de novos arquivos de replay com título, nome do uploader e descrição através de um modal.
    *   **Read:** Visualização de todos os replays enviados em um grid moderno e responsivo.
    *   **Update:** Edição das informações textuais (título, nome, descrição) de um replay existente.
    *   **Delete:** Exclusão de replays do sistema, com uma etapa de confirmação.
*   **Parsing de Arquivo:** O backend analisa o arquivo `.rec` no momento do upload para extrair automaticamente o nome do mapa e o número de jogadores.
*   **Interface Dinâmica:** A interface exibe um banner de card diferente para cada modo de jogo (1v1, 2v2, 3v3, 4v4), com base nos dados extraídos do arquivo.
*   **Download de Replays:** Cada card possui um botão que permite baixar o arquivo `.rec` original.
*   **Design Responsivo:** A interface se adapta perfeitamente a diferentes tamanhos de tela, de desktops a dispositivos móveis.
*   **Tratamento de Erros:** Mensagens de erro são exibidas ao usuário caso ocorra uma falha na comunicação com a API.

## Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

*   Node.js (versão 16 ou superior)
*   NPM (geralmente instalado com o Node.js)
*   Um servidor MySQL em execução.

### 1. Configuração do Banco de Dados

1.  Crie um novo banco de dados (schema) no seu servidor MySQL. Você pode chamá-lo de `coh2_replays`.
2.  Importe o arquivo `.sql` fornecido na entrega do projeto para criar a tabela `replays` com a estrutura e os campos corretos.

### 2. Configuração do Backend (API)

1.  Navegue até a pasta da API no seu terminal:
    ```bash
    cd api
    ```

2.  Instale todas as dependências necessárias:
    ```bash
    npm install
    ```

3.  **Importante:** Verifique a conexão com o banco de dados. Abra o arquivo `api/db.js` e, se necessário, altere as credenciais (`host`, `user`, `password`, `database`) para que correspondam à sua configuração local do MySQL.

4.  Inicie o servidor do backend:
    ```bash
    node index.js
    ```
O terminal deverá exibir a mensagem "Connected to backend on port 8800.". O servidor estará em execução em `http://localhost:8800`.

### 3. Configuração do Frontend (React)

1.  Em um **novo terminal**, navegue até a pasta do projeto React:
    ```bash
    cd reactProject
    ```

2.  Instale todas as dependências necessárias:
    ```bash
    npm install
    ```

3.  Inicie o servidor de desenvolvimento do frontend:
    ```bash
    npm run dev
    ```
O terminal irá indicar o endereço local onde a aplicação está rodando (geralmente `http://localhost:5173`). Abra este endereço no seu navegador para visualizar e interagir com o sistema.
