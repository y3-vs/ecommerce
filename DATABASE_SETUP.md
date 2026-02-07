# Database Setup Guide

This project uses PostgreSQL as the database and Prisma as the ORM.

## Prerequisites

1. **PostgreSQL** must be installed and running on your system
   - Download from: https://www.postgresql.org/download/
   - Default port: 5432

2. **Create a database**:
   ```sql
   CREATE DATABASE ecommerce_db;
   ```

## Configuration

1. Update the `.env` file with your PostgreSQL credentials:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db?schema=public"
   ```

2. Replace `username` and `password` with your actual PostgreSQL credentials

## Running Migrations

Once PostgreSQL is installed and the database is created, run:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view/edit data
npx prisma studio
```

## Database Schema

The schema includes the following models:

- **User**: User accounts with authentication
- **Category**: Product categories
- **Product**: Product catalog with inventory tracking
- **Basket**: Shopping cart items (supports both logged-in users and guests)
- **Address**: Shipping/billing addresses
- **Order**: Purchase orders
- **OrderItem**: Individual items within an order

## Prisma Client Usage

Import the Prisma client singleton in your API routes:

```typescript
import { prisma } from '@/lib/prisma'

// Example usage
const products = await prisma.product.findMany()
```

## Useful Commands

```bash
# Reset database (caution: deletes all data)
npx prisma migrate reset

# View database in browser UI
npx prisma studio

# Generate Prisma Client after schema changes
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name
```
