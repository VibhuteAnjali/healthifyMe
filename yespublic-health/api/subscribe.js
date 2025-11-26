import mysql from "mysql2/promise";

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  let connection;

  try {
    connection = await mysql.createConnection(config);

    const [result] = await connection.execute(
      "INSERT INTO Subscribers (Email) VALUES (?)",
      [email]
    );

    return res.status(200).json({ success: true, message: "Subscribed!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "DB Error" });
  } finally {
    if (connection) await connection.end();
  }
}
