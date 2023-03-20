import postgres from 'pg';

const Pool = postgres.Pool;

const pool = new Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "backend-course"
});

export default pool;