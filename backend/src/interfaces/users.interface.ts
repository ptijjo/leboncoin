export interface User {
  id?: number;
  email: string;
  password: string;
  pseudo: string;
  photo_profil: string;
  role?: string;
  created_at: string;
  last_connection?: string;
}
