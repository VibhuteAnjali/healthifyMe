import mysql from "mysql2/promise";

// MySQL connection config
const config = {
  host: process.env.DB_HOST,     // e.g., '142.93.186.101'
  user: process.env.DB_USER,     // your DB username
  password: process.env.DB_PASS, // your DB password
  database: process.env.DB_NAME, // your DB name
  port: 3306,                    // MySQL default port
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  let connection;

  try {
    // Connect to MySQL
    connection = await mysql.createConnection(config);

    // Insert email into Subscribers table
    const [result] = await connection.execute(
      "INSERT INTO subscribe (email) VALUES (?)",
      [email]
    );

    return res.status(200).json({ success: true, message: "Subscribed!" });
  } catch (err) {
    console.error("DB Error:", err);
    return res.status(500).json({ message: "Something went wrong!. Please try again later." });
  } finally {
    if (connection) await connection.end();
  }
}
