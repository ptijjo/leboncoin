/* eslint-disable prettier/prettier */
export interface Article {
  id?: string;
  title: string;
  description: string;
  prix: number;
  created_at: string;
  last_update?: string;
  userId: string;
  categoryId: string;
  favoriId?: string;
  validationId: string;
}
