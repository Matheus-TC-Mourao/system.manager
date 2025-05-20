# Sistema de Gerenciamento

Esta API RESTful foi desenvolvida em **NestJS** para gerenciar usuários, estabelecimentos, produtos e regras de negócio associadas, com persistência em **DynamoDB** por meio do ORM **Dynamoose**.

A escolha do NestJS foi motivada por sua arquitetura modular, injeção de dependências e escalabilidade, garantindo uma estrutura limpa e de fácil manutenção.

## Tecnologias e Boas Práticas

- **NestJS** (TypeScript): framework que promove organização de código e padrões de projeto.
- **DynamoDB + Dynamoose**: armazenamento NoSQL na AWS com modelagem de esquemas simplificada.
- **UUID**: geração de identificadores únicos para todos os registros, garantindo integridade e segurança.
- **class-validator**: validação dos DTOs através de decoradores.
- **Princípios SOLID** e **Clean Code**: para manter o projeto escalável e de fácil evolução.

## Pré‑requisitos

* Node.js ≥ 16.x
* Conta AWS ou DynamoDB local em execução
* Variáveis em `.env`:

  * `AWS_REGION`
  * `AWS_ACCESS_KEY_ID`
  * `AWS_SECRET_ACCESS_KEY`

## Instalação & Execução

```bash
git clone https://github.com/Matheus-TC-Mourao/system.manager.git
cd system.manager
npm install
npm run start:dev
```

## Quatro Módulos Principais

1. **User**
2. **Establishment**
3. **Product**
4. **EstablishmentRules**

Cada módulo possui suas entidades, DTOs, repositório, serviço e controller.

## Rotas da API

### User

| Método | Rota         | Descrição         | Exemplo Body                                        |
| ------ | ------------ | ----------------- | --------------------------------------------------- |
| POST   | `/user`     | Criar usuário     | `{"name": "User","email": "user.email@example.com","type": "owner"}` |
| GET    | `/user/:id` | Buscar por ID     | —                                                   |
| GET    | `/user`     | Listar todos      | —                                                   |
| PATCH    | `/user/:id` | Atualizar usuário | `{ "name": "Maria" }`                               |
| DELETE | `/user/:id` | Remover usuário   | —                                                   |

### Establishment

| Método | Rota                         | Descrição                 | Exemplo Body                                                     |
| ------ | ---------------------------- | ------------------------- | ---------------------------------------------------------------- |
| POST   | `/establishment`            | Criar estabelecimento     | `{ "name": "Loja X", "ownerId": "uuid-owner", "type": "local" }` |
| GET    | `/establishments`            | Listar todos              | —                                                                |
| GET    | `/establishment/:id`        | Buscar por ID             | —                                                                |
| GET    | `/establishment/type/:type` | Filtrar por tipo          | —                                                                |
| PATCH    | `/establishment/:id`        | Atualizar estabelecimento | `{ "name": "Loja Y" }`                                           |
| DELETE | `/establishments/:id`        | Remover estabelecimento   | —                                                                |

### Product

| Método | Rota            | Descrição         | Exemplo Body                                                                       |
| ------ | --------------- | ----------------- | ---------------------------------------------------------------------------------- |
| POST   | `/product`     | Criar produto     | `{ "name": "Produto A", "price": 99.90, "establishmentId": "uuid-establishment" }` |
| GET    | `/product`     | Listar todos      | —                                                                                  |
| GET    | `/product/:id` | Buscar por ID     | —                                                                                  |
| PATCH    | `/product/:id` | Atualizar produto | `{ "price": 119.90 }`                                                              |
| DELETE | `/product/:id` | Remover produto   | —                                                                                  |

### EstablishmentRules

| Método | Rota                                                     | Descrição                         | Exemplo Body                                                                        |
| ------ | -------------------------------------------------------- | --------------------------------- | ----------------------------------------------------------------------------------- |
| POST   | `/establishment-rules`                                   | Criar regras                      | `{ "establishmentId": "uuid-establishment", "picturesLimit": 10, "videoLimit": 5 }` |
| GET    | `/establishment-rules/by-establishment/:establishmentId` | Buscar regras por estabelecimento | —                                                                                   |
| PATCH    | `/establishment-rules/:id`                               | Atualizar regras                  | `{ "picturesLimit": 20 }`                                                           |
| DELETE | `/establishment-rules/:id`                               | Remover regras                    | —                                                                                   |



## Licença

MIT License © Matheus-TC-Mourao
