Validar ser as Headers quando invalidas retornam um erro 401.

Validar se quando o corpo da requisição (body) é invalido retorna um erro 400.

Validar se o payload correto esta sendo enviado para a API da Technopeed.

Validar se quando a API da Technopeed retorna um erro requisição é retornada com um erro 400 ou 500.

Validar se o retorno da API junto com o body da requisição é salvo na tabela WebhookReprocessado.

Validar se tudo estiver correto, então a requisição é retornada com um sucesso status 200.

Validar se o fluxo de execução é o seguinte:
headers seja validada
lança um erro 401
e depois o body seja validado
lança um erro 400