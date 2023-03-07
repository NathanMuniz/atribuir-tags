## Criar entidade User

Iremos usar alguns métodos para criar nossas entidades:

- uuid - gerar id aleatório único
- class-transformer - fornecer vários decorator que iremos usar para modificar a forma como iremos mostrar a classe

Antes de fazer a entidade User, precisamos habilitar os decorator no typescript, então deixamos o tsconfig dessa maneira:

```json
{
  "compilerOptions": {
    "lib": [
      "es5",
      "es6"
    ],
    "outDir": "build/compiled",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "target": "ES2019",
    "module": "commonjs",
    "moduleResolution": "node",
    "importHelpers": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "noImplicitAny": true,
    "declaration": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "stripInternal": true,
    "pretty": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "downlevelIteration": true
  },
  "include": [
    "sample",
    "src",
    "test"
  ],
  "exclude": [
    "tmp",
    "temp",
    "build",
    "node_modules"
  ]
}
```

Agora podemos criar a entidade User, através dela o typeorm cria a table User no sqlite. 

Iremos criar uma classe User com propriedades, e para que cada propriedade vire uma coluna iremos usar decorators.

- @PrimaryColumn Cria uma coluna primária
- @Column - Cria uma coluna
- @CreateDateColumn - Cria uma coluna que automaticamente insere a data de criação
- @UpdateDateColumn  - Cria uma coluna que automaticamente pega a data atual toda vez que o método save for chamado.

Nossa classe terá uma função constructor que será responsável por transformar por gerar um nova uuid e assinar na nossa propriedade.

```tsx

// src/entities/User.ts
npm run typeorm entity:create -n User

import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @Exclude()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
```

Após criar nossa entidade, iremos configurar nossa aplicação para gerar nossa migrations. (Migration ajuda a manter o database visionado, no qual se algo der errado, podemos voltar para versões anteriores). 

Para que o typeorm sabia onde estão os paths de entidade e migrations iremos configurar nosso datasource 

```tsx
// data-source.ts
import 'dotenv/config'
import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'atribuir-tags.sqlite',
  entities: [`./src/**/entities/*.{ts,js}`],
  migrations: [`./src/**/migrations/*.{ts,js}`]
})
```

Dessa maneira, basta criar o script para criar nossas migrations e passar o data-source como um arquivo de configuração. 

Também precisamos criar um script para rodar as migrations.

```json
"scripts": {
    "dev": "ts-node-dev src/server.ts",
    "migration:generate": "typeorm-ts-node-commonjs -d ./src/data-source.ts migration:generate ./src/database/migrations/default",
    "migration:run": "typeorm-ts-node-commonjs -d ./src/data-source.ts migration:run"
  },
```

## Crie uma feature para criar novos usuários

Agora que já temos a entidade User em nosso database, precisamos do User Repository, que é responsável por esconder métodos em relação a entidade (Criar, deletar, atualizar etc…)

O Typeorm já cria esses métodos automaticamente quando criamos um novo repository 

```tsx
// repositories/UserRepository.ts

import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User)

export { UserRepository }
```

Para implementar as regras de negócio, iremos criar a camada service que irá validades os dados e chamar o Repository para criar um novo User.

Regras:

- Não pode haver mais de um usuários com o mesmo email
- Não pode haver usuário sem email

Precisamos criar um interface para validar os dados que virem do request

```tsx

// service/CreateUserService.ts
import { UserRepository } from "../repositories/UserRepository"

interface IUser {
  name: string,
  email: string,
  password: string,
  admin: boolean
}

class CreateUserService {
  async execute({ name, email, password, admin }: IUser) {
    const userRepository = UserRepository

    if (!email) {
      throw new Error("Você precisa passar um email válido para criar um novo usuário")
    }

    const emailAlreadyExist = await userRepository.findOneBy({
      email,
    })

    console.log(emailAlreadyExist);

    if (emailAlreadyExist) {
      throw new Error("Email já registrado")
    }

    const user = userRepository.create({
      name,
      email,
      password,
      admin,
    })

    await userRepository.save(user)

    return user

  }
}

export { CreateUserService }
```

Tendo o CreateUserService, iremos criar a camada responsável por intermediar entre os inputs do usuário e o service, o User Controller

```tsx
// controllers/CreateUserController.ts

import { Request, Response } from 'express'
import { CreateUserService } from '../service/CreateUserService'

class CreateUserController {
  async handler(req: Request, res: Response) {
    const { name, email, password, admin } = req.body

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ name, email, password, admin })

    console.log(user)

    return res.json(user)

  }
}

export { CreateUserController }
```

Para usar nosso controller e organizar nossas routas iremos criar um arquivo routes.ts

```tsx

import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'

const router = Router()

const createUserController = new CreateUserController

router.post('/users', createUserController.handler)

export { router }
```

Criamos um novo endpotins /users que será conectando com o controller responsável por criar um novo user 

Então exportamos essa router para nossa aplicação

```tsx
import express from "express"
import { AppDataSource } from "./data-source"
import { router } from "./routes"

// var cors = require('cors')

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json())
  // app.use(cors())

  app.use(router)

  app.listen('3000', () => {
    console.log("server is running on: localhost:3000");
  })

  return app

})
```

