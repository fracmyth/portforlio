export interface Demon {
  id: number;
  position: number; // The API uses 'position' for Rank
  name: string;
  publisher: { name: string }; // The API nests the creator name
  base_stats: { points: number }; 
}