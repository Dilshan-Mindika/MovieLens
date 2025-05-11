
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple validation
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // For demo purposes: just redirect to home
      localStorage.setItem('user', JSON.stringify({ email, name: name || email.split('@')[0] }));
      window.location.href = '/';
    }, 1500);
  };

  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-movie-primary via-[#064663] to-[#041C32]">
      <div className="bg-background/90 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-2">
            <svg 
              className="w-8 h-8 text-movie-secondary" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M4,6H2v14c0,1.1,0.9,2,2,2h14v-2H4V6z" />
              <path d="M20,2H8C6.9,2,6,2.9,6,4v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M20,16H8V4h12V16z" />
              <path d="M12,5.5v9l6-4.5L12,5.5z" />
            </svg>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-movie-secondary to-movie-accent">
              FilmFinder
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        <p className="text-muted-foreground text-center mb-6">
          {isLogin 
            ? 'Sign in to access your account' 
            : 'Join and discover amazing movies'}
        </p>

        {error && (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg border border-border bg-card focus:outline-none focus:border-movie-secondary"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-card focus:outline-none focus:border-movie-secondary"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              {isLogin && (
                <Link to="/forgot-password" className="text-sm text-movie-secondary hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-card focus:outline-none focus:border-movie-secondary"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-movie-secondary text-white font-medium rounded-lg hover:bg-movie-secondary/90 transition-colors flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              className="ml-1 text-movie-secondary hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <div className="relative flex justify-center items-center mt-6">
          <div className="border-t border-border flex-grow"></div>
          <div className="px-3 text-muted-foreground text-sm">or</div>
          <div className="border-t border-border flex-grow"></div>
        </div>

        <div className="mt-6 space-y-3">
          <button className="w-full flex items-center justify-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
            <svg width="20" height="20" fill="#4285F4" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 10.2a8.5 8.5 0 10-3.25 6.675v-.789h-3.25V14.24h3.25v-.643a5.1 5.1 0 113.25-3.398z" />
              <path d="M10.2 7.588v2.613h4.333a3.688 3.688 0 01-1.625 2.45L15.13 14.24A6.15 6.15 0 0016.3 10.2H10.2z" fill="#34A853" />
              <path d="M6.95 12.15L6.013 12.9l-.937.75a5.1 5.1 0 010-6.9l.937.75.938.75A3.063 3.063 0 006.95 10.2c0 .684.25 1.312.672 1.8a3.063 3.063 0 00-.672 1.8z" fill="#FBBC04" />
              <path d="M10.2 6.375v2.613H16.3a6.15 6.15 0 00-1.17-4.038l-2.223 1.588a3.688 3.688 0 01.625.487 3.063 3.063 0 01.672 1.8 3.063 3.063 0 01-.672 1.8 3.688 3.688 0 01-1.625 2.45 5.1 5.1 0 01-7.75-2.45L1.95 12.15a7.65 7.65 0 0013.18 2.79l2.223-1.588A7.65 7.65 0 0010.2 3.5a7.306 7.306 0 00-5.1 1.924L7.323 7.5A4.331 4.331 0 0110.2 6.375z" fill="#EA4335" />
            </svg>
            <span>Continue with Google</span>
          </button>
          <button className="w-full flex items-center justify-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition-colors">
            <svg width="20" height="20" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 10.06C20 4.5 15.52 0 10 0S0 4.5 0 10.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H5.9v-2.9h2.54V7.84c0-2.52 1.5-3.91 3.77-3.91 1.1 0 2.24.2 2.24.2v2.47H13.1c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.45 2.9h-2.33v7.02C16.34 19.24 20 15.08 20 10.06z" />
            </svg>
            <span>Continue with Facebook</span>
          </button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          By continuing, you agree to our <Link to="/terms" className="text-movie-secondary">Terms of Service</Link> and <Link to="/privacy" className="text-movie-secondary">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default Login;
