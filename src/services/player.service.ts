import api from './axios';
import type { ApiResponse, PlayerStats } from '../types';

export async function getPlayerStats(playerId: string) {
  return api.get<ApiResponse<PlayerStats>>(`/v1/players/${playerId}`);
}
