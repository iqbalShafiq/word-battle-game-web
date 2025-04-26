import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../services/auth.service';
import { useToastStore } from '../store/toast.store';
import { isValidEmail, isValidPassword } from '../lib/utils';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const setToast = useToastStore((state) => state.setToast);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    if (!name) {
      setNameError('Name is required');
      hasError = true;
    } else {
      setNameError('');
    }
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
    } else if (!isValidPassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters and include a letter, a number, and a special character'
      );
      hasError = true;
    } else {
      setPasswordError('');
    }
    if (password !== passwordConfirmation) {
      setPasswordError('Password confirmation does not match');
      hasError = true;
    }
    if (hasError) return;
    setLoading(true);
    setError('');
    try {
      const res = await registerApi(name, email, password);
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
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (nameError) setNameError('');
            if (error) setError('');
          }}
          error={nameError}
        />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError('');
            if (error) setError('');
          }}
          error={emailError}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError('');
            if (error) setError('');
          }}
          error={passwordError}
        />
        <Input
          type="password"
          placeholder="Password Confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
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
