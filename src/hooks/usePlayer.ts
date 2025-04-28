import { useState, useEffect } from 'react';
import { PlayerData } from '../types';

export function usePlayer() {
  const [player, setPlayer] = useState<PlayerData | null>(null);

  useEffect(() => {
    const playerStr = localStorage.getItem('player');
    if (playerStr) {
      setPlayer(JSON.parse(playerStr));
    }
  }, []);

  return player;
}