# Uma API REST Para Cadastro De Elogios

## Index

- [Usuário](#User-Usuário)
- [Tags](#tags)
- [Elogios](#Compliment-Elogio)
- [Autenticação](#Autenticação)
- [Autorização](#Autorização)
- [Rest](#Rest)
- [Endpoints](#Endpoints)
- [Stack](#Stack)
- [Construção passo a passo](#Construção-passo-a-passo)

## User-Usuário

---

Essa API permite o cadastro de usuário. Quando um novo usuário é cadastrado é possível fazer login através de autenticação por token. Essa API permite ter usuário Admin e usuário padrão. Apena os usuários que são Admin podem criar novas Tags e cadastrar novos Compliments/Elogios.

Como regra de de negócio, não é permitido cadastrar usuários sem email e não é permitido o cadastro de mais de 1 usuário com o mesmo email.

## Tags

---

As Tags são usadas para cadastrar novos Compliments/Elogios. Elas representam uma qualidade de uma pessoa, exemplo de Tags: “inteligente”, “curioso”, “divertido”, dentre outras.

O Cadastro de Tags tem como regras de negócios: não é permitido cadastrar tag sem nome, não é permitido cadastrar mais de uma tag como o mesmo nome, não é permitido o cadastro de tags por usuários que não sejam Admin.

## Compliments-Elogio

Os Compliments, ou em português Elogios, são criados quando um usuário define uma Tag para outro Usuários. Além da Tag e o ID do Usuário, é possível enviar uma mensagem junto com o Elogio.

O Elogio tem relação com a entidade Tag e com a entidade Usuário. Um Elogio pode ter uma única Tag relacionada a ele, e uma Tag pode ter vários Elogios relacionados a ela (1:N). Um Usuário pode cadastrar vários Elogios, porém cada Elogio tem apenas um Usuário relacionado a ele (1:N). 

As regras de negócio para cadastro de Elogios são: não é permitido cadastrar um elogio para si mesmo, não é permitido cadastrar um elogio para um usuário inválido e não é permitido o cadastro por usuário que não sejam administradores.

## Autenticação

---

Autenticação do usuário é feita passando o username e senha, e retorna um token de autenticação. Esse token de autenticação é válido por 1 dia e você pode usar ele para acessar outros recursos da aplicação. 

```mermaid
sequenceDiagram
Client->>Service: Autenticar o cliente (username/pass) 
Service->>AuthenticateUser: Buscar e validar (username/pass)
AuthenticateUser->>Service: Usuário válido (token + dados)
Service->>Client: token + dados
AuthenticateUser->>Service: Usuário Inválido 
Service->>Client: "Dados inválidos"
```

Assim que o Client usa um recurso da aplicação, é necessário enviar junto o token de autenticação. Para fazer a validação do token usamos um Middleaware ensureAutenticated. Uma vez que o token for válido ele permite o client para acessar aquele recurso. 

A validação feita usando Middleaware permite que esse token seja usado em todas os recursos que precisam que o Usuário faça login.  

```mermaid
sequenceDiagram
Client->>Service: Ver Elogios + token
Service->>ensureAutenticated: validar token
ensureAutenticated->>ListCompliments: Token válido (buscar compliments)
ListCompliments->>Service:  User Compliments
Service->>Client: User Compliments
ensureAutenticated->>Service: token inválido
Service->>Client: Usuário não autenticado
```

## Autorização

---

Alguns recursos como criar Tag necessita que o Usuário seja admin. O usuário tem um campo boolean que diz se esse usuário é admin ou não. 

Quando um usuário tenta acessar algum recursos que exige admin=true, um middleware ensureAdmin é chamado. Esse middleware apenas responde “Unathorized” quando o usuário não for admin, caso ele seja, ele permite acesso ao recurso.

```mermaid
sequenceDiagram
Client->>Service: criar tag(tag_name + authToken) 
Service->>ensureAdmin: validar usuário
ensureAdmin->>createTag: Usuário válido
createTag->>Service: newTAG 
Service->>Client: "TagCreated" + newTag
ensureAdmin->>Service: Usuário inválido 
Service->>Client: "Admin Required"
```

## REST

---

A característica REST da nossa aplicação facilita na escalabilidade, sistema em camadas (Uso de middleawares) e conseguir se adaptar a todo tipo de Client - o que também aumenta muita a escalabilidade. 

As desvantagens de ser REST é ter que enviar tokens de autenticação toda vez que precisamos certificar que um usuário está autenticado. Essa aplicação não guarda a informação de que um usuário está ou não autenticado. 

## Endpoints

---

### User

---

******************Cadastro****************** 

POST: [http://localhost:](http://localhost:3000/)PORT/users

```json
"// Payload"

{
	"name" : "test_user",
	"email" : "test_user@gmail.com",
	"password": "12345",
	"admin" : true
}

"// Response "

{
	"id": "2024b85e-6cd8-4d9e-bc4b-67c4c30d5ce8",
	"name": "test_user",
	"email": "test_user@gmail.com",
	"admin": true,
	"password": "12345",
	"created_at": "202x-0x-26T14:30:32.000Z",
	"updated_at": "202x-0x-26T14:30:32.000Z"
}
```

 **********Login**********

POST:  [http://localhost:](http://localhost:3000/)PORT/login

```json
"// Payload"
{
	"email" : "test_user@gmail.com",
	"password": "12345"
}

"// Response - token de autenticação"
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hc3RlckBnbWFpbC5jb20iLCJpYXQiOjE2NzY5ODYyODAsImV4cCI6MTY3NzA3MjY4MCwic3ViIjoiYzlhNDc5ZmQtNmJiMC00NTBiLTgxODEtYjcxNjJmYWMxNTY0In0.0M9OUgFOiyyiSE78N4nfltrxF8GJ9i8LvYqt-meN8Jo"
```

************************Listar User************************ 

GET: [http://localhost:](http://localhost:3000/)PORT/users

```json
"Bearer Token - tokne de autentiação"
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hc3RlckBnbWFpbC5jb20iLCJpYXQiOjE2NzY5ODI3NzgsImV4cCI6MTY3NzA2OTE3OCwic3ViIjoiYzlhNDc5ZmQtNmJiMC00NTBiLTgxODEtYjcxNjJmYWMxNTY0In0.NSqgdfMTJoHbepVWqftGgG71tZ-KnJ-BnO9o185s5W0"

"// Response "
[
	{
		"id": "efe009b6-ab22-4167-bf1e-328719ccefe7",
		"name": "test_user",
		"email": "test_user@gmail.com.br",
		"admin": true,
		"created_at": "202x-0x-10T17:13:07.000Z",
		"updated_at": "202x-0x-10T17:13:07.000Z"
	},
]
```

### Tags

---

**Cadastro**

POST:  [http://localhost:](http://localhost:3000/)PORT/tags

```json
"// Payload"
{
	"name": "inteligente"
}

"// Response"
{
	"id": "199de2a3-f8ec-4ca5-9d50-382e524a0a3a",
	"name": "inteligente"
}

```

************************Listar Tags************************ 

GET: [http://localhost:](http://localhost:3000/)PORT/tags

```json
"// Bearer Token - tokne de autentiação"
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hc3RlckBnbWFpbC5jb20iLCJpYXQiOjE2NzY5ODI3NzgsImV4cCI6MTY3NzA2OTE3OCwic3ViIjoiYzlhNDc5ZmQtNmJiMC00NTBiLTgxODEtYjcxNjJmYWMxNTY0In0.NSqgdfMTJoHbepVWqftGgG71tZ-KnJ-BnO9o185s5W0"

"// Response "
[
	{
		"id": "d26d72c6-99ec-4838-9cb2-076eb4d61455",
		"name": "inteligente",
		"created_at": "202x-0x-11T01:31:54.000Z",
		"updated_at": "202x-0x-11T01:31:54.000Z",
		"name_custom": "#inteligente"
	},
]

```

### Compliments

---

******************Cadastro****************** 

POST:  [http://localhost:](http://localhost:3000/)PORT/compliments

```json
"// Payload"

{
	"tag_id" : "199de2a3-f8ec-4ca5-9d50-382e524a0a3a",
	"user_receiver" : "7a9487b2-893a-4b6b-917d-cf204ce78d29",
	"message" : "Thanks for the help"
}

"// Response"
{
	"id": "e74ca29a-d31f-4c09-a366-fc9da028ed98",
	"user_sender": "c9a479fd-6bb0-450b-8181-b7162fac1564",
	"user_receiver": "7a9487b2-893a-4b6b-917d-cf204ce78d29",
	"tag_id": "199de2a3-f8ec-4ca5-9d50-382e524a0a3a",
	"message": "Thanks for the help",
	"created_at": "202x-0x-2xT13:32:17.000Z"
}
```

**************************************************************Listar compliments recebidos de um usuário**************************************************************

GET: [http://localhost:](http://localhost:3000/)PORT/users/compliments/receive

```json
"// Bearer Token - tokne de autentiação"
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hc3RlckBnbWFpbC5jb20iLCJpYXQiOjE2NzY5ODI3NzgsImV4cCI6MTY3NzA2OTE3OCwic3ViIjoiYzlhNDc5ZmQtNmJiMC00NTBiLTgxODEtYjcxNjJmYWMxNTY0In0.NSqgdfMTJoHbepVWqftGgG71tZ-KnJ-BnO9o185s5W0"

"// Response"
[
	{
		"id": "e74ca29a-d31f-4c09-a366-fc9da028ed98",
		"user_sender": "2024b85e-6cd8-4d9e-bc4b-67c4c30d5ce8",
		"user_receiver": "7a9487b2-893a-4b6b-917d-cf204ce78d29",
		"tag_id": "199de2a3-f8ec-4ca5-9d50-382e524a0a3a",
		"message": "Thanks for the help",
		"created_at": "202x-0x-21T12:35:55.000Z",
		"userSender": {
			"id": "2024b85e-6cd8-4d9e-bc4b-67c4c30d5ce8",
			"name": "test_user",
			"email": "test_user@gmail.com",
			"admin": true,
			"created_at": "202x-0x-21T12:32:40.000Z",
			"updated_at": "202x-0x-21T12:32:40.000Z"
		},
]
```

********************Listar compliments enviados de um usuário********************

```json
"// Bearer Token - tokne de autentiação"
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hc3RlckBnbWFpbC5jb20iLCJpYXQiOjE2NzY5ODI3NzgsImV4cCI6MTY3NzA2OTE3OCwic3ViIjoiYzlhNDc5ZmQtNmJiMC00NTBiLTgxODEtYjcxNjJmYWMxNTY0In0.NSqgdfMTJoHbepVWqftGgG71tZ-KnJ-BnO9o185s5W0"

[
	{
		"id": "e74ca29a-d31f-4c09-a366-fc9da028ed98",
		"user_sender": "2024b85e-6cd8-4d9e-bc4b-67c4c30d5ce8",
		"user_receiver": "7a9487b2-893a-4b6b-917d-cf204ce78d29",
		"tag_id": "199de2a3-f8ec-4ca5-9d50-382e524a0a3a",
		"message": "Thanks for the help",
		"created_at": "202x-0x-21T12:35:55.000Z",
		"userReceiver": {
			"id": "2024b85e-6cd8-4d9e-bc4b-67c4c30d5ce8",
			"name": "test_user",
			"email": "test_user@gmail.com",
			"admin": true,
			"created_at": "202x-0x-21T12:32:40.000Z",
			"updated_at": "202x-0x-21T12:32:40.000Z"
		},
]
```

---

## O que ainda precisa ser feito

### Adicionar Tests

Adicionar tests a essa aplicação irá ajudar a expandir, uma vez que podemos criar novas features e garantir consistência em relação a outras features que já funcionam. Adicionar tanto tests unitários quanto tests de integração. 

### Refazer estrutura

Esse projeto por seguir alguns conceitos de API REST é capaz de escalar com facilidade, porém a estrutura de pasta atual não permite que isso acontece.  É necessário criar 1 arquivo controller só para gerenciar todos as requisições em relação ao user, ou pelo menos deixar todos os Controller em relação a user em uma única pasta. O mesmo tem que ser feito com o Service, dessa maneira é possível criar novas funcionalidade e não se perder em um monte de Controller e Service.

### Usar um Database de verdade

Essa aplicação usa o SQLite, que é um dos mais fáceis de trabalhar. Porém ele não é útil em ambiente de produção, mudar de SQLite para Mysql já ajudaria muito, para isso é preciso alterar alguns coisas na configuração.

## Stack

**Stack**: TypeScript, Node.js, SQLite, TypeORM.

## Construção passo a passo

- Configuração e Instalação inicial - instalação de biblioteca, configuração de banco de dados e iniciando aplicação. [passo a passo](https://github.com/NathanMuniz/atribuir-tags/blob/main/passo-a-passo/configuracao-inicial.md)
- Create user - Entidade user e métodos responsáveis por criar um novo usuário. [passo a passo](https://github.com/NathanMuniz/atribuir-tags/blob/main/passo-a-passo/create-user.md)
