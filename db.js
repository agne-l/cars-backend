import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  // eslint-disable-next-line no-undef
  connectionString: process.env.DB_CONNECTION,
});

export default pool;
