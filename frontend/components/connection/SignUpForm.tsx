import React, { useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import { Url } from '@/lib/Url';


type Data1 = {
    email: string,
    password: string,
    pseudo: string,
}

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Data1>();

    const SignUp: SubmitHandler<Data1> = async (data) => {
        try {

            const user = await axios.post(Url.enregistrement, data);

            (user) && reset();

            toast.success(`Bienvenue ${user.data.data.pseudo}`);

        } catch (error: any) {
            toast.error(`${error.response.data.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(SignUp)}>
            <div className="flex flex-col w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5 w-full lg-w-3/4">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email..." type="email" {...register('email')} required />
                    {errors.email && errors.email.type === "required" && <span>Email Obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full lg-w-3/4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Password..." type="password" {...register('password')} required />
                    {errors.email && errors.email.type === "required" && <span>Email Obligatoire</span>}
                </div>
                <div className="flex flex-col space-y-1.5 w-full lg-w-3/4">
                    <Label htmlFor="pseudo">Pseudo</Label>
                    <Input id="pseudo" placeholder="Pseudo..." type="text" {...register("pseudo", { required: true })} />
                    {errors.pseudo && errors.pseudo.type === "required" && <span>Nom obligatoire</span>}
                </div>
                <Button type="submit" className='bg-orange-500 text-white w-3/4 lg:w-[40%]'>Enregistrer</Button>
            </div>
            <ToastContainer autoClose={5000} />
        </form>
    )
}

export default SignUpForm

