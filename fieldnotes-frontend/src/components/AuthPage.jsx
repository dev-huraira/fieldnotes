import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { BookOpen, AlertCircle, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegistering) {
        if (!username || !email || !password) {
          setError('All fields are required');
          setLoading(false);
          return;
        }
        const result = await register(username, email, password);
        if (!result.success) {
          setError(result.error);
        }
      } else {
        if (!email || !password) {
          setError('Please provide email and password');
          setLoading(false);
          return;
        }
        const result = await login(email, password);
        if (!result.success) {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-notebook-bg px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Branding header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-notebook-accent/10 text-notebook-accent mb-4">
            <BookOpen size={24} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-normal font-serif tracking-tight text-notebook-text">
            Fieldnotes
          </h2>
          <p className="mt-2 text-sm text-notebook-muted font-sans font-normal">
            A quiet place for your notes
          </p>
        </div>

        {/* Auth form card */}
        <div className="rounded-notebook border border-notebook-border bg-notebook-bg p-8 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-start gap-2.5 rounded-notebook bg-notebook-coral/10 p-3 text-sm text-notebook-coral">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed">{error}</span>
              </div>
            )}

            {isRegistering && (
              <div>
                <label 
                  htmlFor="username" 
                  className="block text-xs font-semibold uppercase tracking-wider text-notebook-muted mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-notebook border border-notebook-border bg-transparent px-3 py-2 text-notebook-text placeholder-notebook-muted/50 focus:border-notebook-borderActive focus:outline-none text-sm font-sans"
                  placeholder="e.g. explorer12"
                />
              </div>
            )}

            <div>
              <label 
                htmlFor="email" 
                className="block text-xs font-semibold uppercase tracking-wider text-notebook-muted mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-notebook border border-notebook-border bg-transparent px-3 py-2 text-notebook-text placeholder-notebook-muted/50 focus:border-notebook-borderActive focus:outline-none text-sm font-sans"
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-xs font-semibold uppercase tracking-wider text-notebook-muted mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-notebook border border-notebook-border bg-transparent px-3 py-2 text-notebook-text placeholder-notebook-muted/50 focus:border-notebook-borderActive focus:outline-none text-sm font-sans"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-notebook bg-notebook-accent py-2 text-sm font-medium text-white hover:bg-notebook-accentHover focus:outline-none disabled:opacity-50"
            >
              {loading ? 'Processing...' : isRegistering ? 'Register' : 'Sign In'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Toggle register / login */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-xs font-medium text-notebook-accent hover:underline focus:outline-none"
            >
              {isRegistering
                ? 'Already have an account? Sign in'
                : "Don't have an account yet? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
