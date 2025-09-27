# Guia de Escrita e Organização de Testes (Node)

Este documento define convenções e diretrizes para escrita, organização e manutenção de testes em projetos Node com TypeScript. É genérico (sem dependência de bibliotecas específicas) e foca em nomes, estrutura e práticas.

## 1. Extensão e convenções de nomes

- Extensão de arquivos de teste: todos os arquivos de teste devem terminar com `.test.ts`.
- Nomes de arquivos de teste:
  - Testes unitários: `nomeDoArquivo.test.ts` ao lado do arquivo sob teste.
  - Testes de integração e E2E: seguem o nome do domínio/módulo e o fluxo exercitado.
- Pareamento de nomes: ao criar `src/feature/doSomething.ts`, o teste unitário correspondente deve ser `src/feature/doSomething.test.ts`.

## 2. Estrutura de diretórios

- Testes unitários: ficam no mesmo diretório e nível do arquivo sob teste.
- Testes de integração e E2E: ficam dentro de `__tests__/` na raiz do repositório, organizados assim:
  - `__tests__/integrations/`
  - `__tests__/e2e/`

Recomenda-se replicar a hierarquia de domínios/módulos dentro dessas pastas quando fizer sentido (por exemplo, `__tests__/integrations/auth/`, `__tests__/e2e/checkout/`).

## 3. Definição de tipos de teste

- Unitário
  - Foco: a menor unidade logicamente significativa (função, método, classe) isolada.
  - Objetivo: validar comportamento interno, bordas e contratos públicos da unidade.
  - Isolamento: sem dependências externas reais; preferir isolamento de I/O e clock.
- Integração
  - Foco: colaboração entre duas ou mais unidades/peças do sistema e suas fronteiras internas.
  - Objetivo: validar contratos entre componentes, mapeamentos, serializações e interações.
  - Abrangência: pode envolver camadas de dados ou de rede simuladas ou ambientes controlados.
- E2E (fim a fim)
  - Foco: fluxos completos do ponto de vista do usuário ou de um consumidor externo.
  - Objetivo: validar cenários reais, integrações externas e requisitos funcionais de ponta a ponta.
  - Abrangência: executa o sistema o mais próximo possível do ambiente real, com dados e estado controlados.

## 4. Títulos e descrições dos testes

Escreva títulos claros, específicos e orientados a comportamento. Use voz ativa e termos do domínio.

- Prefixos recomendados (para facilitar filtros e leitura de relatórios):

  - Testes unitários: `[unit]` ou `[u]` no início do título da suíte/arquivo quando conveniente.
  - Testes de integração: `[integration]` ou `[int]` no início do título da suíte.
  - Testes E2E: `[e2e]` no início do título da suíte.

- Formato recomendado para SUÍTES (escopos maiores):

  - `<Tipo> <Módulo/Componente> — <Contexto/Fluxo>`
  - Exemplos de formato (sem código):
    - `[unit] <Utilitário> — <Normalização de dados>`
    - `[integration] <Serviço X + Repositório Y> — <Sincronização>`
    - `[e2e] <Fluxo de Checkout> — <Pagamento aprovado>`

- Formato recomendado para CASOS (títulos de cenários):

  - `<Condição/Entrada> -> <Resultado/Observável>`
  - Use conectivos para explicitar pré-condições e resultado esperado.
  - Exemplos de formato (sem código):
    - `<Entrada inválida> -> <Erro de validação>`
    - `<Sessão expirada> -> <Redireciona para login>`

- Estilo:
  - Seja específico: descreva o comportamento observável, não a implementação interna.
  - Evite negações duplas e termos ambíguos.
  - Linguagem: português claro (ou inglês), mas mantenha consistência em todo o projeto.

## 5. Padrão TDD (Test-Driven Development)

- Ciclo:
  1. Red: escrever um teste que falha de maneira significativa (falha que prova um requisito).
  2. Green: implementar o mínimo necessário para o teste passar, sem otimizações prematuras.
  3. Refactor: melhorar o design/código mantendo todos os testes verdes.
- Benefícios:
  - Especificação executável do comportamento.
  - Design incremental com feedback rápido.
  - Menor acoplamento e maior coesão por meio de APIs guiadas por uso real.
- Boas práticas:
  - Escreva testes pequenos, legíveis e independentes.
  - Um motivo de falha por teste (clareza de causa).
  - Evolua os testes junto com o código durante o refactor (evite cristalização acidental).

## 6. Boas práticas gerais

- Determinismo: testes devem produzir o mesmo resultado em execuções repetidas.
- Isolamento: não compartilhe estado entre testes; limpe efeitos colaterais (arquivos, rede, cache, relógio).
- Dados de teste: dados mínimos e representativos; construtores de dados (builders) e fixtures estáveis.
- Ambiente: variáveis de ambiente e configurações explícitas; não dependa do ambiente de desenvolvimento local.
- Erros e falhas: mensagens claras e orientadas ao usuário do teste (o que falhou e por quê).
- Cobertura: métricas são um guia, não um fim; priorize caminhos críticos de negócio e bordas.
- Performance: evite esperas desnecessárias; paralelize onde seguro; estabilize dependências externas.
- Nomenclatura: nomes de arquivos, pastas e títulos devem refletir o comportamento validado.

## 7. Critérios de aceitação para PRs com testes

- Estrutura e nomes em conformidade com este guia.
- Títulos de suíte/casos claros, com prefixo de tipo quando aplicável.
- Testes independentes, determinísticos e autoexplicativos.
- Justificativa quando um cenário relevante não é testado (riscos conhecidos).

## 8. Resumo rápido (checklist)

- Arquivos de teste: `.test.ts`.
- Unitários: ao lado do arquivo sob teste.
- Integração e E2E: em `__tests__/integrations` e `__tests__/e2e`.
- Títulos: prefixos por tipo e formato `<Condição> -> <Resultado>`.
- TDD: Red → Green → Refactor.
- Determinismo, isolamento, dados mínimos e mensagens claras.
