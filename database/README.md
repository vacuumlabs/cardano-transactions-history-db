## Database
We use a **PostgresQL** database to store the historical transaction data.

### Setup
To start a local database:
1. Run the docker images: `docker-compose up`.
    - it will start a `postgresql database` on port **5432** (can be changed via setting the `DB_PORT` env variable)
    - it will start an `adminer` (db admin with a web ui) on port **8080** (can be changed via setting the `ADMINER_PORT` env variable)
    - (if you plan to modify the database schema, you should run the watcher script with `npm run start`. It will watch for any changes in the `src` folder and compile the typescript files to javascript. The compiled files will be placed in the `dist` folder, which can be imported into the `implementations/` modules.)
2. The exported modules (from `src/index.ts`) can be imported into external node modules (the ones defined in the`implementations/` folder)
    - The initialization of the database (`initializeTransactionDB()` in `src/index.ts`) should be done in the external node module. It is guaranteed that the initialization script will be run only once, so it is safe to call it in several concurrent modules.