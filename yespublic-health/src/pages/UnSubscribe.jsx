import { useState } from 'react';
import content from '../data/content.json';

export function Subscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Thank you for subscribing! You will receive updates soon.' 
        });
        setIsSubscribed(true);
        setEmail('');
      } else {
        setStatus({ 
          type: 'error', 
          message: data.message || 'An error occurred. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Failed to subscribe. Please try again later.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!email) return;
    
    setIsLoading(true);
    setStatus({ type: '', message: '' });
    
    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'You have been successfully unsubscribed.' 
        });
        setIsSubscribed(false);
        setEmail('');
      } else {
        setStatus({ 
          type: 'error', 
          message: data.message || 'Failed to unsubscribe. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({ 
        type: 'error', 
        message: 'Failed to process your request. Please try again later.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container narrow">
        <h2>{content.subscribe.header}</h2>
        <ul>
          {content.subscribe.benefits.map((b, idx) => (
            <li key={idx}>✅ {b}</li>
          ))}
        </ul>
        
        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}

          <form className="subscribe-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              required 
              disabled={isLoading}
            />
            <button 
              className="btn" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

      <style jsx>{`
        .status-message {
          padding: 12px;
          margin: 15px 0;
          border-radius: 4px;
          font-weight: 500;
        }

        .status-message.success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status-message.error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .subscription-actions {
          text-align: center;
          padding: 20px 0;
        }

        .subscription-actions p {
          margin-bottom: 15px;
          font-size: 1.1em;
        }

        .subscribe-form {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        input[type="email"] {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1em;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          background-color: #007bff;
          color: white;
          cursor: pointer;
          font-size: 1em;
          transition: background-color 0.3s;
        }

        .btn:hover:not(:disabled) {
          background-color: #0056b3;
        }

        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-secondary {
          background-color: #6c757d;
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: #5a6268;
        }

        @media (max-width: 600px) {
          .subscribe-form {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

export function Unsubscribe() {
  return (
    <section className="section">
      <div className="container narrow">
        <h2>Unsubscribe</h2>
        <p>{content.subscribe.unsubscribe.message}</p>
        <a className="btn" href="/subscribe">{content.subscribe.unsubscribe.cta}</a>
      </div>
    </section>
  );
}
