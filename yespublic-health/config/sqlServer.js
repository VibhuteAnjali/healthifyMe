import sql from 'mssql';

export const sqlConfig = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'your_strong_password',
  database: process.env.DB_NAME || 'HealthifyMe',
  server: process.env.DB_SERVER || 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(sqlConfig);
    return pool;
  } catch (error) {
    console.error('Database Connection Error:', error);
    throw error;
  }
};

export const createTables = async () => {
  try {
    const pool = await getConnection();
    
    // Create Subscribers table if it doesn't exist
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Subscribers' AND xtype='U')
      CREATE TABLE Subscribers (
        id INT IDENTITY(1,1) PRIMARY KEY,
        email NVARCHAR(255) NOT NULL UNIQUE,
        created_at DATETIME DEFAULT GETDATE()
      )
    `);
    
    console.log('Database tables verified/created');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

export default {
  sqlConfig,
  getConnection,
  createTables
};
