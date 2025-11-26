import { useState } from 'react';
import content from '../data/content.json';

export default function Unsubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
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
          message: 'You have been successfully unsubscribed.',
        });
        setEmail('');
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Email not found.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus({
        type: 'error',
        message: 'Failed to process your request. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container narrow">
        <h2>Unsubscribe</h2>
        <p>{content.subscribe.unsubscribe.message}</p>

        {status.message && (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )}

        <form className="subscribe-form" onSubmit={handleUnsubscribe}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
          <button className="btn btn-secondary" type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Unsubscribe'}
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

          @media (max-width: 600px) {
            .subscribe-form {
              flex-direction: column;
            }

            .btn {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
