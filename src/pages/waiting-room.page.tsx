import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useState } from 'react';

export default function WaitingRoomPage() {
  const navigate = useNavigate();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = () => {
    setIsCancelling(true);
    setTimeout(() => {
      navigate('/lobby');
    }, 600); // Simulasi delay cancel matchmaking
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-primary gap-8">
      <h1 className="text-3xl font-bold text-accent mb-2">Waiting Room</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="text-lg text-textmuted mb-4">Menunggu pemain lain untuk matchmaking...</div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-accent border-solid mb-4" />
        <Button
          className="w-48 py-3 text-lg bg-danger text-white hover:bg-red-600 shadow"
          onClick={handleCancel}
          disabled={isCancelling}
        >
          {isCancelling ? 'Membatalkan...' : 'Batal'}
        </Button>
      </div>
    </div>
  );
}
