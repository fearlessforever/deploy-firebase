## Knex
  - Migration
    - Make migration
      - npm run knex migrate:make create_example_table

    - Applying migration ( update database )
      - npm run knex migrate:latest
      - npm run knex migrate:up

    - Rolling Back
      - npm run knex migrate:rollback -- --all
      - npm run knex migrate:rollback

  - Seed
    - Make seed
      - npm run knex seed:make required_data

    - Applying seed ( insert data to database )
      - npm run knex seed:run
      - npm run knex seed:run -- --specific=seed-filename.ts --specific=another-seed-filename.ts

  - Documentation
    - https://knexjs.org/guide/query-builder.html
    
## ENV
  - Generate Key
   - openssl rand -base64 43