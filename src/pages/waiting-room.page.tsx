import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useState } from 'react';

export default function WaitingRoomPage() {
  const navigate = useNavigate();
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancel = () => {
    setIsCancelling(true);
    setTimeout(() => {
      navigate('/');
    }, 600); // Simulasi delay cancel matchmaking
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-primary">
      {/* Card utama waiting room */}
      <div className="bg-white/10 rounded-2xl shadow-2xl px-10 py-8 flex flex-col items-center max-w-md w-full relative animate-fade-in">
        <h1 className="text-3xl font-bold text-accent mb-2">Waiting Room</h1>
        {/* Avatar dan slot lawan */}
        <div className="flex items-center gap-6 my-6">
          <div className="flex flex-col items-center">
            <img
              src="https://api.dicebear.com/7.x/thumbs/svg?seed=You"
              alt="You"
              className="w-14 h-14 rounded-full border-2 border-accent"
            />
            <span className="text-accent text-xs mt-1">You</span>
          </div>
          <svg className="w-8 h-8 text-accent animate-pulse" fill="none" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14" stroke="#ffc857" strokeWidth="3" opacity="0.5" />
            <path d="M16 8v8l6 3" stroke="#ffc857" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <div className="flex flex-col items-center opacity-60">
            <img
              src="https://api.dicebear.com/7.x/thumbs/svg?seed=Waiting"
              alt="Waiting"
              className="w-14 h-14 rounded-full border-2 border-accent/40"
            />
            <span className="text-accent/60 text-xs mt-1">Waiting...</span>
          </div>
        </div>
        {/* Pesan dan spinner */}
        <div className="text-md font-semibold text-textmuted mb-2 text-center">
          Menunggu pemain lain untuk matchmaking...
        </div>
        <div className="flex flex-col items-center w-full">
          {/* Spinner dan progress bar */}
          <div className="relative flex flex-col items-center my-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-accent border-solid mb-2" />
          </div>
        </div>
        {/* Tombol batal */}
        <Button
          className="w-48 py-2 text-md rounded-full bg-white/20 backdrop-blur-md text-danger font-bold flex items-center justify-center gap-2 shadow-lg border-none hover:bg-danger hover:text-white transition-colors duration-200 mb-2"
          onClick={handleCancel}
          disabled={isCancelling}
        >
          {isCancelling ? 'Membatalkan...' : 'Batalkan'}
        </Button>
        {/* Tips/info */}
        <div className="text-xs text-accent/70 mt-2 text-center italic">
          Tips: Sabar menunggu, gunakan waktu ini untuk menyiapkan strategi!
        </div>
      </div>
    </div>
  );
}
