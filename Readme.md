# Projeto para teste de conhecimento em Node

## Descrição

Projeto para teste de conhecimento em Node.js, com o objetivo de criar uma API RESTful para um sistema de cadastro de usuários.

## Tecnologias

- [x] Node.js
- [x] Typescript
- [x] Express
- [x] Prisma
- [x] Postgres

## Startup

Para rodar o projeto, siga os passos abaixo:

1. Clone o repositório
2. Instale as dependências com `pnpm install`, `npm install` ou `yarn install`
3. Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente conforme o arquivo `.env.example`
4. Execute as migrations com `pnpx prisma migrate dev` ou `npx prisma migrate dev` ou `yarn prisma migrate dev`
5. Inicie o servidor com `pnpm dev`, `npm dev` ou `yarn dev`

## Rotas

### Usuários

- `GET /users`: Lista todos os usuários
- `POST /users`: Cria um novo usuário

  - Body:

    ```json
    {
      "name": "string",
      "email": "string",
      "password": "string" // Mínimo de 6 caracteres / Mínimo duas letras maiúsculas / Mínimo um caractere especial
    }
    ```

- `GET /clients`: Exibe uma lista com todos os clientes

## Detalhes de implementação

A aplicação foi criada seguindo alguns preceitos do SOLID e da Arquitetura Limpa, com a separação de responsabilidades em camadas, utilização de injeção de dependências e fazendo a inversão das dependências para que nosso core business não dependa de uma implementação concreta mas sim de uma interface.

### A organização de pastas foi pensada da seguinte maneira

- src
  - core
    - modules
      - user
      - client
      - invoice
      - send-mail
      - auth
  - infra
    - adapters
    - db
    - server

### A separação de camadas foi pensada da seguinte maneira

- Core: Aqui ficam os módulos de domínio da aplicação, onde são definidos os contratos e as regras de negócio, sem depender de implementações concretas, cada módulo é responsável por uma parte do negócio, como por exemplo, o módulo de usuário é responsável por todas as regras de negócio relacionadas a usuários. Cara módulo possui uma "porta", que fica na parte de infra de cada respectivo módulo. Esta porta é a utilizada como comunicação entre o core da nossa aplicação e a infraestrutura, seguindo um pouco dos preceitos de ports and adapters.
  </br>
- Infra: Aqui ficam as implementações concretas dos contratos definidos no core, como por exemplo, a implementação de um repositório que acessa o banco de dados
  </br>
  - Adapters: Aqui ficam as implementações de interfaces que são utilizadas por módulos do core, como por exemplo, um serviço de envio de e-mail ou um client http. Essa implementação é interessante para que possamos trocar a implementação concreta sem que o core precise ser alterado.
    </br>
  - DB: Aqui ficam as configurações do banco de dados, como por exemplo, a conexão com o banco de dados
    </br>
  - Server: Aqui ficam as configurações do servidor, como por exemplo, a inicialização do express e a definição das rotas

### Como eu implementaria os módulos não implementados

- Auth: O módulo de autenticação seria responsável por gerar tokens JWT e verificar se um token é válido, ele teria uma porta que seria implementada na infraestrutura, onde seria feita a geração e verificação dos tokens. Além de fornecer uma api, ele também deve fornecer uma serviço para ser usado como middleware onde estaria implementada a lógica de verificação do token.
  </br>
- Invoice: O módulo de faturas seria responsável por gerar faturas para os clientes, este módulo provavelmente deveria ser um serviço assíncrono, pois, dependendo da quantidade de faturas geradas, isso pode demorar um pouco, então, ele poderia ser implementado utilizando um serviço de fila, como por exemplo, o RabbitMQ, onde ele receberia um comando para gerar uma fatura e colocaria esse comando na fila, e um consumer ficaria responsável por pegar esse comando e gerar a fatura. Este módulo poderia fornecer uma api para um webhook que seria chamado quando uma fatura fosse gerada. Além disso, ele poderia fornecer uma api para gerar uma fatura manualmente e fornecer também um tratamento de dead letter queue para tratar possíveis erros na geração de fatura, retentar ou avisar ao responsável para que o mesmo faça a geração manual.
  </br>
- Send-mail: O módulo de envio de e-mails seria responsável por enviar e-mails para os usuários, onde seria feito o envio do e-mail. Semelhante ao módulo de Invoice, ele poderia ser implementado utilizando um serviço de fila, como por exemplo, o RabbitMQ, onde ele receberia um comando para enviar um e-mail e colocaria esse comando na fila, e um consumer ficaria responsável por pegar esse comando e enviar o e-mail.
