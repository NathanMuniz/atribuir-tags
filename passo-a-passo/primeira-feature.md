# Configuração Inicial

## Instação e configuração

Inicie um novo projeto e instale as bibliotecas de desenvolvimento

- Typescript - Adiciona tipos ao JavaScript
- ts-node-dev - Rodar código .ts sem precisar compilar
- sqlite3 - Conectar-se ao banco de dados
- @types/express - Adiciona tipos ao express
- @types/node - Adiciona tipos ao node

instale os frameworks principais 

- express - Criar um servidor
- typeorm - Mapear banco de dados
- reflecte-metadata - Método required do TypeORM para habilitar decorator e funções para ver metada de classes

```powershell
npm init
yarn add typescrit ts-node-dev sqlite3 @types/express @types/node
yarn add express typeorm reflect-metadata
```

Crie src/server.ts que será o arquivo onde iremos rodas nossa aplicação. Para rodar ele iremos criar um novo comando e usar o ts-node-dev.

```tsx
// package.json - on scripts
"dev": "ts-node-dev src/server.ts"

//tsconfig
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

Crie um arquivo data-source.ts dentro do src, nele iremos criar nova conexão com o banco de dados.

No arquivo server.ts, iremos inicializar esse aplicação, e quando inicializada, iremos inicializar uma nova aplicação express.

```tsx
// src/data-source.ts

import "reflect-metadata"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "atribuir-tags.sqlite",
})

export { AppDataSource } 

// src/server.ts
import express from "express"
import { AppDataSource } from "./data-source"

var cors = require('cors')

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json())
  app.use(cors())

  app.get('/', (req, res) => {
    return res.send("olá mundo")
  })

  app.listen('3000', () => {
    console.log("server is running on: localhost:3000");
  })

  return app

})
```

- Tente rodar a aplicação na url localhost:3000
