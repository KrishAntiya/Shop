import mysql from 'mysql2/promise'

let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'swastik_pharma',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 5000, // 5 seconds connection timeout
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    })
  }
  return pool
}

export async function query(sql: string, params?: any[]) {
  const pool = getPool()
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error: any) {
    // Enhanced error logging for debugging
    console.error('Database query error:', error.message)
    throw error
  }
}

