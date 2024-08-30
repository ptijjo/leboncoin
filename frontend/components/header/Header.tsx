"use client"
import React, { useEffect } from 'react';
import HeaderMenu from './HeaderMenu';
import Recherche from './Recherche';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { CiSquarePlus } from "react-icons/ci";
import { UserData } from '@/lib/InterfaceData';
import { useRouter } from 'next/navigation';
import { Selector } from '@/lib/features/hooks';
import { selectUser } from '@/lib/features/user/userSlice';

const Header = () => {

    const router = useRouter();
    const userData: UserData = Selector(selectUser);

    const handlePostAnnonce = (): void => {
        (!userData) ? router.push("/connection") : router.push("/ajouterAnnonce")
    };

    return (
        <header className='border flex flex-row items-center justify-around w-full p-1.5'>
            <Link href="/" className='w-[80px] h-[40px] lg:w-[10%] lg:h-[60px] relative -top-[13px] lg:-top-[20px]'>
                <div className=' flex items-center justify-center'>
                    <Image src="/logo/logo.png" alt="Logo" width={80} height={80} priority className='w-auto h-auto' />
                </div>
            </Link>
            <Button className='bg-orange-500 text-black gap-2' onClick={handlePostAnnonce}><CiSquarePlus className='text-lg' /> Deposer un annonce</Button>
            <Recherche />
            <HeaderMenu />
        </header>
    )
}

export default Header
