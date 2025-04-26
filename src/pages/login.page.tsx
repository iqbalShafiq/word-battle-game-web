import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/standard-button';
import Input from '../components/form-input';
import { login as loginApi } from '../services/auth.service';
import { isValidEmail } from '../lib/utils';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: typeof errors = {};
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    try {
      const res = await loginApi(form.email, form.password);
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
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
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
