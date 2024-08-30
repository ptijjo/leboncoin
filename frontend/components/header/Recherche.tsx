'use client'
import React from 'react';
import { Input } from '../ui/input';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from '../ui/button';


const Recherche = () => {

    const handleRecherche = () => {

    };


    return (
        <div className='flex items-center lg:w-[400px]'>
            <div className='hidden lg:flex gap-1 relative w-4/5'>
                <Input type='search' placeholder='Rechercher sur ...' className='h-[40px] bg-slate-100' />
                <FaMagnifyingGlass className='bg-orange-500 text-black w-[30px] h-[30px] p-2 rounded-lg absolute left-[285px] top-[5px] cursor-pointer' />
            </div>
            <div className='flex lg:hidden'>
                <Dialog>
                    <DialogTrigger id='recherche' aria-label='recherche'> <FaMagnifyingGlass className='bg-orange-500 text-black w-[30px] h-[30px] p-2 rounded-lg' /></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogDescription className='flex flex-col gap-2 items-center'>
                                <Input type='search' className='' />
                                <DialogClose asChild >
                                    <Button className='bg-orange-500 w-[40%]' onClick={handleRecherche} id='rechercher' aria-label='rechercher'>Rechercher</Button>
                                </DialogClose>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Recherche
