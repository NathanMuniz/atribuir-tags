# Atribuir Tags

## Sobre

Atribuir Tags é uma API backend feita em Typescritp, para criar usuários, tags e atribuir tags a esse usuários. 

A API permite registar e logar usuários através de token authentication que certifica que o usuários é válido.

Uma vez que o usuário está devidamente autenticado e for admin, ele é capaz de criar tags, essa tags são usadas para criar compliments (Elogios com uma tag e uma mensagem que pode ser atribuído a outros usuários).

A API usa Node/Express server com database SQLite. Usamos o TypeORM com class-transformer para criar as entidades e JSONWebToken para criação e verificação de tokens.

## Stack

**Stack**: TypeScript, Node.js, SQLite, TypeORM.

## Features

- Configuração e Instalação inicial - instação de biblioteca, configuração de banco de dados e iniciando aplicação. (passo-a-passo)[passo-passo/configuracao-inicial.md]
