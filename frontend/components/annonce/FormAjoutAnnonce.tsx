"use client"
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ToastContainer } from 'react-toastify';
import { Textarea } from '../ui/textarea';
import { Url } from '@/lib/Url';
import axios from 'axios';
import { ArticleData } from '@/lib/InterfaceData';
import { useRouter } from 'next/navigation';



type Data = {
    title: string;
    description: string;
    prix: string;
    userId: string;
    nomCategory: string;
    media: string;
}


const FormAjoutAnnonce = () => {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Data>();

    const newArticle: SubmitHandler<Data> = async (data): Promise<ArticleData> => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('prix', data.prix.toString());
            formData.append('nomCategory', data.nomCategory);
            formData.append('description', data.description);
            formData.append('media', data.media[0]);




            console.log(data);
            const token: string = localStorage.getItem("token") as string;
            const article = await axios.post(Url.newArticle, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(article.data);
            reset();
            router.push("/")
            return article.data;


        } catch (error) {
            console.log(error);
            throw Error(`Une erreur s'est produite : ${error}`)
        }
    }


    return (
        <form onSubmit={handleSubmit(newArticle)}>
            <div className="flex flex-col w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 w-full lg:w-4/5">
                    <Label htmlFor="title">Titre</Label>
                    <Input id="title" placeholder="Titre de l'article" type="text" {...register('title')} required />
                    {errors.title && errors.title.type === "required" && <span>Un titre est obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full lg:w-4/5">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="desscription" placeholder="Dessscription de l'article" {...register('description')} required />
                    {errors.description && errors.description.type === "required" && <span>Une description est obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full lg:w-4/5">
                    <Label htmlFor="prix">Prix</Label>
                    <Input id="prix" placeholder="Prix en €" type="number" {...register('prix')} required />
                    {errors.prix && errors.prix.type === "required" && <span>Un prix est obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full lg:w-4/5">
                    <Label htmlFor="category">Category</Label>
                    <select {...register("nomCategory")}>
                        <option value="">--Please choose an option--</option>
                        <option value="voiture">Voiture</option>
                    </select>
                    {errors.nomCategory && errors.nomCategory.type === "required" && <span>Catégorie est obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full lg:w-4/5">
                    <Label htmlFor="media">Ajouter une photo</Label>
                    <Input id="media" placeholder="Dessscription de l'article" type="file" {...register('media')} required />
                    {errors.media && errors.media.type === "required" && <span>Une photo est obligatoire</span>}
                </div>
                <Button type="submit" className='bg-orange-500 text-white w-3/4 lg:w-[40%]'>Connection</Button>
            </div>
            <ToastContainer autoClose={5000} />
        </form>
    )
}

export default FormAjoutAnnonce
