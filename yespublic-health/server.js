import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';
import { getConnection, createTables } from './config/sqlServer.js';
import sql from 'mssql';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST"]
  }
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests, please try again later.'
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));
app.use(express.json());
app.use(express.static(join(__dirname, 'dist')));
app.use('/api/', limiter);

// API Routes
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address.' 
      });
    }

    const pool = await getConnection();
    
    // Check if email exists
    const checkResult = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT id FROM Subscribers WHERE email = @email');

    if (checkResult.recordset.length > 0) {
      return res.status(200).json({ 
        success: true, 
        message: 'You are already subscribed!',
        alreadySubscribed: true
      });
    }

    // Insert new subscriber
    await pool.request()
      .input('email', sql.NVarChar, email)
      .query('INSERT INTO Subscribers (email) VALUES (@email)');

    // Get total count
    const countResult = await pool.request()
      .query('SELECT COUNT(*) as count FROM Subscribers');
    const count = countResult.recordset[0].count;

    io.emit('subscriberCount', { count });

    res.status(200).json({ 
      success: true, 
      message: 'Thank you for subscribing!',
      count
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your subscription.' 
    });
  }
});

// Get subscriber count
app.get('/api/subscribers/count', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query('SELECT COUNT(*) as count FROM Subscribers');
    res.status(200).json({ count: result.recordset[0].count });
  } catch (error) {
    console.error('Error getting subscriber count:', error);
    res.status(500).json({ error: 'Failed to get subscriber count' });
  }
});

// Unsubscribe endpoint
app.post('/api/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const pool = await getConnection();
    
    // Check if email exists and delete
    const result = await pool.request()
      .input('email', sql.NVarChar, email)
      .query('DELETE FROM Subscribers WHERE email = @email');

    if (result.rowsAffected[0] > 0) {
      // Get updated count
      const countResult = await pool.request()
        .query('SELECT COUNT(*) as count FROM Subscribers');
      const count = countResult.recordset[0].count;

      io.emit('subscriberCount', { count });

      return res.status(200).json({ 
        success: true, 
        message: 'Successfully unsubscribed' 
      });
    } else {
      return res.status(404).json({ 
        success: false, 
        message: 'Email not found in our subscription list' 
      });
    }
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request' 
    });
  }
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// Connect to SQL Server and start the server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await createTables();
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}/api`);
      console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export { app };