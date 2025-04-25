import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerApi } from '../services/auth.service';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Password confirmation does not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await registerApi(name, email, password);
      if (res.data.code === 201 && res.data.data) {
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
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password Confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
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
