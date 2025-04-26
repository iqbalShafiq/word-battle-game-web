import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../services/auth.service';
import { useToastStore } from '../store/toast.store';
import { isValidEmail, isValidPassword } from '../lib/utils';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', passwordConfirmation: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const setToast = useToastStore((state) => state.setToast);
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
    if (!form.name) {
      newErrors.name = 'Name is required';
    }
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(form.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(form.password)) {
      newErrors.password =
        'Password must be at least 8 characters and include a letter, a number, and a special character';
    } else if (form.password !== form.passwordConfirmation) {
      newErrors.password = 'Password confirmation does not match';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    setError('');
    try {
      const res = await registerApi(form.name, form.email, form.password);
      if (res.data.code === 201 && res.data.data) {
        setToast('Register berhasil! Silakan login!');
        navigate('/login');
      } else {
        setError(res.data.message || 'Register failed!');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Register failed!');
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
        <h2 className="text-2xl font-bold text-accent mb-2 text-center">Register</h2>
        {error && <div className="text-danger text-center text-sm">{error}</div>}
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
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
        <Input
          type="password"
          name="passwordConfirmation"
          placeholder="Password Confirmation"
          value={form.passwordConfirmation}
          onChange={handleChange}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <div className="text-center mt-2 text-textmuted">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
