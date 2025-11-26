import sql from "mssql";

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("INSERT INTO Subscribers (Email) VALUES (@email)");

    return res.status(200).json({ success: true, message: "Subscribed!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "DB Error" });
  }
}
