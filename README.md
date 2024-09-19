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
3. Run `npm run start` command
4. Navigate to http://localhost:3000/
5. Loading organizations:
```
http://localhost:3000/organizations
```

6. Create organization:

```
curl -H "Content-Type: application/json" -X POST http://localhost:3000/organizations -d '{"name":"frank"}'
```

7. Delete organization:

```
curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/organization/frank 
```

8. pgadmin SQL to join organization and organization subscription:

```
select organizations.name as organization_name,
	organization_subscriptions.state as organization_subscription_state
from organizations
join organization_subscriptions on organizations.id = organization_subscriptions.organization_id;
```