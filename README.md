## MODAL LESSON

### THE STACK

- NextJS
- Typescript
- TailwindCSS
- Supabase / StepZen
- Apollo / GraphQL

Description of app coming soon:

To run the app locally
`yarn`

Create a `.env` file and a local instance DB:

#### Example:

`DATABASE_URL=postgresql://postgres:password@localhost:5432/myDbName?schema=public`

#### Run your DB Migration:

`yarn db:migrate`

##### Seed Migration: (under construction)

`yarn db:seed`

##### Reset DB if needed:

`yarn db:reset`

#### When adding new fields to schema

run `npm run db:migrate`
run `npm run db:seed`

##### few notes

stepzen start to watch graphql schema changes
