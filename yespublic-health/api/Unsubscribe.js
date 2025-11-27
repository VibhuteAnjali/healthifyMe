import mysql from "mysql2/promise";

// MySQL connection config
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
};

export default async function handler(req, res) {
 
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  let connection;

  try {
    connection = await mysql.createConnection(config);

    // Check if the email exists
    const [existing] = await connection.execute(
      "SELECT * FROM subscribe WHERE email = ?",
      [email]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Update last_name to “Unsub”
    await connection.execute(
      "UPDATE subscribe SET last_name = 'Unsub' WHERE email = ?",
      [email]
    );

    return res.status(200).json({ success: true, message: "Unsubscribed successfully!" });

  } catch (err) {
    console.error("DB Error:", err);
    return res.status(500).json({ message: "Something went wrong! Please try again later." });
  } finally {
    if (connection) await connection.end();
  }
}
