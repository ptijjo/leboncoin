export interface User {
  id?: string;
  email: string;
  password: string;
  pseudo: string;
  phone?: number;
  first_name?: string;
  last_name?: string;
  photo_profil: string;
  role?: string;
  created_at: string;
  last_connection?: string;
}
