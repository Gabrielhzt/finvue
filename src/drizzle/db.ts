import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(
    process.env.NODE_ENV === 'production' 
        ? process.env.DATABASE_URL as string 
        : process.env.DATABASE_URL_DEV as string
);

export const db = drizzle(sql);