# storefront_backend
Udacity second project fullstack course, this project is about making a store backend contianing uesrs, products and orders 

## instructions
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
 - POSTGRES_HOST=localhost
 - POSTGRES_DB=store_database_dev
 - POSTGRES_DB_TEST=store_database_test
 - POSTGRES_USER=postgres
 - POSTGRES_PASSWORD=qwer1234
 - BCRYPT_PASSWORD=inside-the-tunnel
 - SALT_ROUNDS=10
 - TOKEN_SECRET=thethirdcart
## packages 
 - express
 - nodemon
 - pg
 - db-migrate
 - db-migrate-pg
 - typescript
 - bcrypt
 - jsonwebtoken
 - jasmine
 - jasmin-spec-reporter
 - prettier
 - eslint
 - supertest
 - dotenv

