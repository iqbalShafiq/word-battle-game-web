import { useEffect, useState } from 'react';
import { getPlayerStats } from '../services/player.service';
import { PlayerStats } from '../types';
import { usePlayer } from './usePlayer';

export function usePlayerStats() {
  const player = usePlayer();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!player?.id) return;
    setLoading(true);
    setError(null);
    getPlayerStats(player.id)
      .then((res) => setStats(res.data.data || null))
      .catch((err) => setError(err?.message || 'Failed to fetch stats'))
      .finally(() => setLoading(false));
  }, [player?.id]);

  return { stats, loading, error };
}
