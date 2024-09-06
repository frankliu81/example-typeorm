# Awesome Project Build with TypeORM

# Pre-requitie
- Install postgres locally, and create the database
- on Mac
```
brew update
brew install postgressql
brew services start postgresql
psql postgres
CREATE DATABASE example_typeorm;
\l # list databases and note down username you use to create the db and put it in .env
```

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command
4. Navigate to http://localhost:3000/