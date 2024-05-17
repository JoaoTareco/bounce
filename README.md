## Running the project

This project uses node 18.

There are 3 steps to run the project, after clonning it: 

#### 1. Add the .env file that was sent via email into the root folder of the project

This project uses a database for persistence. The database is hosted and the connection string needs to be added for connection. 

#### 2. Install all packages

To install dependencies, run 

```bash
npm install
```

#### 3. Run the app

To start the app, run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser access it.

## Details

### Main packages used

For this project, here are the main dependencies used:
- react-hook-form for ease of implementing the forms and allowing for form to be separated into specific components.
- Zod for form validation.
- Shadcnui (component library) for the basic components used.
- Prisma as ORM to access a Postgres database

### Database schema

For persistence of created bookings, I used a simple database schema to log:
- Customer info
- Booking info
- Booking status

Here is an overview of the schema:
![image](https://github.com/JoaoTareco/bounce/assets/148398041/c4f52952-b810-4256-a91e-2e5b1a2599e3)
