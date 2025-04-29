import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/standard-button';
import Input from '../components/form-input';
import { login as loginApi, confirmEmail } from '../services/auth.service';
import { getErrorMessage, isValidEmail } from '../lib/utils';
import { useToastStore } from '../store/toast.store';
import { toast } from 'sonner';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { toastMessage, clearToast } = useToastStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const setToast = useToastStore((s) => s.setToast);

  useEffect(() => {
    const email = searchParams.get('email');
    console.log(email);
    if (!email) return;

    const confirmationToken = searchParams.get('confirmationToken');
    console.log(confirmationToken);
    if (!confirmationToken) return;

    if (confirmationToken) {
      confirmEmail(email, confirmationToken)
        .then((res) => {
          if (res.data.code === 200) {
            setToast('Email berhasil dikonfirmasi! Silakan login.');
          } else {
            setToast(res.data.message || 'Konfirmasi email gagal!');
          }
        })
        .catch(() => setToast('Konfirmasi email gagal!'));
    }
  }, [searchParams, setToast]);

  if (toastMessage) {
    toast.success(toastMessage);
    clearToast();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
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
    } catch (err: unknown) {
      setError(getErrorMessage(err));
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
