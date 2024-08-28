
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '../../components/ui/button';



type Data = {
    email: string,
}
const ForgetSign = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Data>();

    const Forget: SubmitHandler<Data> = (data) => {

    }



    return (
        <form onSubmit={handleSubmit(Forget)}>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Email..." type="email" {...register('email')} required />
                    {errors.email && errors.email.type === "required" && <span>Email Obligatoire</span>}
                </div>
                <Button type="submit">Connection</Button>
            </div>
        </form>
    )
}

export default ForgetSign