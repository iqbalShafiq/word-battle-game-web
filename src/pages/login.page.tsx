import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import { login as loginApi } from '../services/auth.service';
import { useToastStore } from '../store/toast.store';
import { toast } from 'sonner';
import { isValidEmail } from '../lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { toastMessage, clearToast } = useToastStore();
  const navigate = useNavigate();

  if (toastMessage) {
    toast.success(toastMessage);
    clearToast();
  }

  if (toastMessage) {
    toast.success(toastMessage);
    clearToast();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (!email) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError('Email is not valid');
      hasError = true;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }
    if (hasError) return;
    setLoading(true);
    try {
      const res = await loginApi(email, password);
      if (res.data.code === 200 && res.data.data) {
        localStorage.setItem('player', JSON.stringify(res.data.data.player));
        navigate('/');
      } else {
        setError(res.data.message || 'Login failed!');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 rounded-xl px-8 py-6 shadow w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-accent mb-2 text-center">Login</h2>
        {error && <div className="text-danger text-center text-sm">{error}</div>}
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
            if (emailError) setEmailError('');
          }}
          error={emailError}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError('');
            if (passwordError) setPasswordError('');
          }}
          error={passwordError}
        />
        <div className="text-right -mb-2 -mt-3">
          <Link to="/forgot-password" className="text-accent/70 hover:underline text-xs">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </Button>
        <div className="text-center mt-2 text-textmuted">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
