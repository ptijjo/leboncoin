/* eslint-disable prettier/prettier */
export interface Article {
  id?: string;
  title: string;
  description: string;
  prix: string;
  created_at: string;
  last_update?: string;
  userId: string;
  categoryId: string;
  favoriId?: string;
  validationId: string;
  media?: { id: string; url: string; articleId: string; }[];
}
