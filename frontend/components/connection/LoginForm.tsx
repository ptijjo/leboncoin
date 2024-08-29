"use client"
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { Url } from '@/lib/Url';
import { Dispatch } from '@/lib/features/hooks';
import { login } from '@/lib/features/user/userSlice';


type Data = {
    identifiant: string,
    password: string,
}

const LoginForm = () => {

    const router = useRouter();
    const dispatch = Dispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Data>();



    const Login: SubmitHandler<Data> = async (data) => {
        try {
            const user = await axios.post(Url.connection, data);
            localStorage.setItem("token", user.data.token);
            const token: string = localStorage.getItem("token") as string;
            dispatch(login(token));
            router.push('/');

        } catch (error: any) {
            console.log(error);
            toast.error(`${error.response.data}`)
        }
    };

    return (
        <form onSubmit={handleSubmit(Login)}>
            <div className="flex flex-col w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 w-full lg:w-4/5">
                    <Label htmlFor="identifiant">Email / Pseudo</Label>
                    <Input id="identifiant" placeholder="Email / Pseudo" type="text" {...register('identifiant')} required />
                    {errors.identifiant && errors.identifiant.type === "required" && <span>Email ou pseudo Obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full lg:w-4/5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Password..." type="password" {...register('password')} required />
                    {errors.password && errors.password.type === "required" && <span>Mot de passe Obligatoire</span>}
                </div>
                <Button type="submit" className='bg-orange-500 text-white w-3/4 lg:w-[40%]'>Connection</Button>
            </div>
            <ToastContainer autoClose={5000} />
        </form>
    )
}

export default LoginForm

