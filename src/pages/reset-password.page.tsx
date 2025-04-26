import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Input from '../components/form-input';
import Button from '../components/standard-button';
import { isValidPassword } from '../lib/utils';
import { useToastStore } from '../store/toast.store';
import { resetPassword } from '../services/auth.service';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<{ password?: string } & { confirmPassword?: string }>({});
  const [loading, setLoading] = useState(false);
  const setToast = useToastStore((s) => s.setToast);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let newErrors: typeof errors = {};
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(form.password)) {
      newErrors.password =
        'Password must be at least 8 characters and include a letter, a number, and a special character';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Password confirmation does not match';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    try {
      const res = await resetPassword(email, token, form.password);
      if (res.data.code === 200) {
        setToast('Password reset successful!');
        navigate('/login');
      } else {
        setToast(res.data.message || 'Reset password failed!');
      }
    } catch (err: any) {
      setToast(err?.response?.data?.message || 'Reset password failed!');
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
        <h2 className="text-2xl font-bold text-accent mb-2 text-center">Reset Password</h2>
        <div className="text-center text-textmuted text-sm mb-2">
          Reset password for{' '}
          <span className="text-accent font-semibold">{email || 'your account'}</span>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </div>
  );
}
