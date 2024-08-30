export  interface UserData {
    user: any;
    userEmail: string;
    userPseudo: string;
    userPhoto: string;
    userRole: string;
}


export interface ArticleData{
    id: string;
    title: string;
    description: string;
    prix: number;
    created_at: string;
    last_update?: string;
    userId: string;
    categoryId: string;
    favoriId?: string;
    validationId: string;
    media: string[];
}