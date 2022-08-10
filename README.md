# storefront_backend
Udacity second project fullstack course, this project is about making a store backend contianing uesrs, products and orders 

## instructions for database and testing
 - database set up:
   - type in PSQL terminal `CREATE USER postgres WITH PASSWORD qwer1234`
   - type `CREATE DATABASE store_database_dev`
   - type `CREATE DATABASE store_database_test`
  
 - type in the terminal `db-migrate up` to migrate the database
 - type in the terminal `npm run build` to build tsc
 - type in the terminal `npm run start` to start the server
 - go to `localhost:3000` port
 - type in the terminal `npm run test` to test the api

## Environment variables
 - ENV=dev
 - POSTGRES_PORT:3000
 - POSTGRES_HOST=localhost
 - POSTGRES_DB=store_database_dev
 - POSTGRES_DB_TEST=store_database_test
 - POSTGRES_USER=postgres
 - POSTGRES_PASSWORD=qwer1234
 - BCRYPT_PASSWORD=inside-the-tunnel
 - SALT_ROUNDS=10
 - TOKEN_SECRET=thethirdcart
 - 
## Packages installation
 - Express `npm i express` `npm i --save-dev @types/express`
 - Nodemon `npm i --save-dev nodemon` 
 - pg `npm i pg` `npm i --save-dev @types/pg `
 - db-migrate `npm i -g db-migrate` 
 - db-migrate-pg `npm i db-migrate-pg`
 - typescript `npm i -D typescript` `npm i --save-dev ts-node`
 - bcrypt `npm i bcrypt` `npm i --save-dev @types/bcrypt`
 - jsonwebtoken `npm i jsonwebtoken` `npm i --save-dev jsonwebtoken`
 - jasmine `npm i --save-dev jasmine`  `npm i --save-dev @types/jasmine`
 - jasmin-spec-reporter `npm i jasmine-spec-reporter`
 - prettier `npm i --save-dev prettier`
 - eslint `npm i eslint` `npm i eslint-config-prettier` `eslint-plugin-prettier` `npm i --save-dev @typescript-eslint/eslint-plugin` `npm i --save-dev @typescript-eslint/parser`
 - supertest `npm i --save-dev suptertest` `npm i --save-dev @types/supertest`
 - dotenv `npm i dotenv`

