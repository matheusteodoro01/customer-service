# Business Requirements of Customer Service

Devido a um grande crescimento, apareceu uma necessidade de um cadastro
performático e seguro para os clientes da empresa.
O escopo desse projeto é a implementação do backend desse sistema, que deve ser uma
RESTful API que suporta as seguintes operações:

    ● Salvar um cliente novo
    ● Atualizar um cliente existente
    ● Buscar um cliente por ID

Para garantir a segurança dos dados cadastrados, a empresa disponibiliza uma API para
autorização de acesso às operações disponíveis.


## Design

<p align="center">
  <a href="https://miro.medium.com/v2/resize:fit:1400/0*iU9Ks05_GTtGh6zV.jpg" target="blank"><img src="https://miro.medium.com/v2/resize:fit:1400/0*iU9Ks05_GTtGh6zV.jpg" width="600" alt="Nest Logo" /></a>
</p>

Foi aplicado o design de arquitetura "Clean Architecture", pois facilita a separação do negócio (core) das regras de infraestrutura (frameworks, clouds, etc).


A camada externa acessa a camada interna, utilizando a injeção de dependência, é possível isolar o core da aplicação dos frameworks utilizados.

Dentro do diretório `src` possuem 3 diretórios principais (domain, infra e main), além do diretório utils.

### Domain

Este diretório deve carregar somente o core da aplicação, como os UseCases, entidades de negócio e interfaces de repositório.

Para este exemplo, cada usecase foi colocado em um diretório distinto, para agrupar com os dominios de input/output e tornar mais limpo a visualização.

Cada usecase deve possuir apenas uma função pública, para que ele não acabe incorporando mais função que o necessário, desta forma facilita a manutenção e criação do teste do mesmo.

## Infra

Neste diretório temos tudo que se enquadra a infra, como conexão com banco de dados, definição de rotas, consumidor de filas, etc.

Desta forma, dentro desse diretório separei alguns diretórios para facilitar a visualização, sendo eles:

- controllers: Faz a ponte entre o handle principal e os usecases, como exemplo a definição de rotas, consumidor de fila ou uma interface de console.
- gateways: Implementação de cada repositório de dados definidos em domains
- helpers: (Opcional) Classes que facilitam a utilização de recursos de infra dentro dos gateways ou controllers. Geralmente devem ser movidos para libs após pouco tempo.
- services: Utilizar apenas quando houver a necessidade de executar uma sequencia de Usecases em uma mesma transação.

## Main

Este diretório contem os handlers de inicialização do projeto, sejam um listen do servidor http, um handle lambda ou uma UI para console.

## Iniciando o projeto

Este projeto pode ser utilizado tanto com yarn quanto npm, porém os exemplos serão apresentados utilizando yarn como o gerenciador padrão.

Primeiro instale as dependências:

```
yarn
```

Copie o arquivo .env.example para .env preencheando com os valores corretos:

```
cp .env.example .env
```

Após isso basta executar o comando:

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test:unit

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Matheus Teodoro](https://kamilmysliwiec.com)
- Website - [Linkedin](https://www.linkedin.com/in/matheus-teodoro-7bb92818a/)
- YouTube - [@Kittech](https://www.youtube.com/@canalkittech)

## License

Nest is [MIT licensed](LICENSE).
