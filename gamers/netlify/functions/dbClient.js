import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ connectionString: process.env.NEON_DB_URL });

export default pool;
