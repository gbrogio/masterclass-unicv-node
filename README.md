## Masterclass API (Express + TypeScript)

Aplicação REST simples em Express 5 + TypeScript, estruturada em módulos. O projeto expõe um recurso de exemplo (`/exits`) para demonstrar uma arquitetura básica de serviços, controladores e roteamento.

### Requisitos

- Node.js 22+
- npm 10+

### Instalação

```bash
npm install
```

### Scripts

- `npm run dev`: roda em desenvolvimento com `tsx` e hot-reload (lendo variáveis de `.env`).
- `npm run build`: compila TypeScript para `dist/`.
- `npm start`: executa a versão compilada (`node dist/server.js`).

### Configuração

- Variáveis de ambiente:
  - `PORT`: porta do servidor (padrão: 3000)
- Arquivo: `src/config/index.ts`

### Executando

Desenvolvimento:

```bash
npm run dev
```

Produção (local):

```bash
npm run build
npm start
```

### Estrutura de Pastas

```
src/
  app.ts           # Cria e configura o Express (JSON, rotas)
  routes.ts        # Registra módulos de rota na aplicação
  server.ts        # Bootstrap: lê config e inicia o servidor
  config/
    index.ts       # Configurações (PORT)
  modules/
    exits/
      exits.module.ts      # Define router e monta endpoints em /exits
      exits.controller.ts  # Lida com Request/Response
      exits.service.ts     # Regras de negócio (memória)
      types.ts             # Tipos/Interfaces do domínio
```

### Arquitetura

- **App (`src/app.ts`)**: instancia `Express`, aplica middlewares e registra `Routes`.
- **Routes (`src/routes.ts`)**: ponto único para montar módulos (ex.: `ExitsModule`).
- **Módulo (`modules/exits`)**: padrão Controller/Service/Types, com `Router` próprio, montado em `/exits`.
- **Config (`src/config`)**: leitura de variáveis e defaults.

### API: /exits

Recurso em memória que registra "saídas" de usuários.

- `POST /exits`

  - Body JSON: `{ "userId": "string" }`
  - 201 Created
  - Resposta:

    ```json
    {
      "id": "uuid",
      "userId": "string",
      "createdAt": "2024-08-31T12:34:56.789Z"
    }
    ```

- `GET /exits`

  - 200 OK
  - Resposta: lista de registros

    ```json
    [
      {
        "id": "uuid",
        "userId": "string",
        "createdAt": "2024-08-31T12:34:56.789Z"
      }
    ]
    ```

Exemplos `curl`:

```bash
curl -sS -X POST http://localhost:3000/exits \
  -H 'Content-Type: application/json' \
  -d '{"userId":"user-123"}'

curl -sS http://localhost:3000/exits
```

### Observações de Implementação

- Os dados ficam apenas em memória (processo). Ao reiniciar, tudo é perdido.
- `createdAt` é uma instância `Date` no serviço; ao serializar, vira ISO 8601.

### Docker

O projeto inclui arquivos para desenvolvimento e produção.

Desenvolvimento:

```bash
docker build -f Dockerfile.development -t masterclass-dev .
docker run --rm -it -p 3000:3000 --env PORT=3000 masterclass-dev
```

Produção:

```bash
docker build -f Dockerfile.production -t masterclass .
docker run --rm -it -p 3000:3000 --env PORT=3000 masterclass
```

Compose (se aplicável):

```bash
docker compose up --build
```

### Próximos Passos

- Persistência (ex.: banco de dados) e camadas de repositório.
- Validações e tratativas de erro centralizadas (middleware).
- Testes automatizados e CI.
