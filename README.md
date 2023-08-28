# Next.js OpenJira App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d

```

- El -d, significa **detached**

* MongoDB URL Local:

```
mongodb://localhost:27018/entriesdb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

- Recontruir los módulos de node y levantar Next en desarrollo

```
yarn o yarn install

o

npm install
yarn dev o npm run dev
```

## Llenar la base de datos con información de pruebas

Llamara:

```
http://localhost:3000/api/seed

```
