'use client';
import {useState} from 'react';
import {createClient} from '@/lib/supabase/client';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elementName: string]: any;
    }
  }
}

export default function Login() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: {preventDefault: () => void}) {
    e.preventDefault();
    setBusy(true);
    setError('');

    try {
      const s = createClient();
      const result =
        mode === 'login'
          ? await s.auth.signInWithPassword({email, password})
          : await s.auth.signUp({email, password});

      if (result.error) throw result.error;

      if (mode === 'signup' && !result.data.session) {
        setError('Check your email to confirm your account, then log in.');
      } else {
        location.href = '/';
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-wrap">
      <section className="auth-card">
        <div className="brand">
          <span className="brand-mark">L</span> LessonLab
        </div>
        <p className="eyebrow">YOUR CLASSROOM, REIMAGINED</p>
        <h1>{mode === 'login' ? 'Welcome back' : 'Create your teacher account'}</h1>
        <p className="muted">Build activities your students will love.</p>
        <form onSubmit={submit} className="stack">
          <label>
            Email address
            <input
              type="email"
              required
              value={email}
              onChange={(e: {target: {value: string}}) => setEmail(e.target.value)}
              placeholder="you@school.com"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="primary full" disabled={busy}>
            {busy ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
        <p className="switch">
          {mode === 'login' ? 'New to LessonLab?' : 'Already have an account?'}{' '}
          <button
            className="link"
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login');
              setError('');
            }}
          >
            {mode === 'login' ? 'Create an account' : 'Log in'}
          </button>
        </p>
      </section>
    </main>
  );
}

