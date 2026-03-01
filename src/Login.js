import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import { BookPage, BackLink, HorizontalRule } from './styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <BookPage>
      <BackLink as={Link} to="/">Title Page</BackLink>

      <div style={{ marginTop: 32, maxWidth: 360 }}>
        <h1 style={styles.heading}>Login</h1>
        <HorizontalRule style={{ marginLeft: 0, maxWidth: 120 }} />

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleLogin} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <button type="submit" style={styles.submit}>
            Sign In
          </button>
        </form>
      </div>
    </BookPage>
  );
}

const styles = {
  heading: {
    fontFamily: "'EB Garamond', serif",
    fontSize: '2rem',
    fontWeight: 700,
    color: '#2C2C2C',
    margin: '0 0 8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 24,
  },
  label: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#7A7A7A',
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  input: {
    fontFamily: "'EB Garamond', serif",
    fontSize: '1.05rem',
    padding: '10px 12px',
    border: '1px solid #D4C5A9',
    borderRadius: 0,
    background: '#FFFDFB',
    color: '#2C2C2C',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  submit: {
    marginTop: 8,
    padding: '10px 28px',
    background: 'transparent',
    color: '#8B4513',
    border: '1px solid #D4C5A9',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  error: {
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.75rem',
    color: '#A94442',
    marginTop: 12,
    marginBottom: 0,
  },
};
