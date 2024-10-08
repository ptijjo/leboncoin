"use client"
import React, { useEffect, useState } from 'react';
import { HiOutlineUser } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger, } from "@/components/ui/menubar";
import { HiDotsVertical } from "react-icons/hi";
import Link from 'next/link';
import { UserData } from '@/lib/InterfaceData';
import Image from 'next/image';
import Loading from '@/app/loading';
import { GrValidate } from "react-icons/gr";
import { useQuery } from '@tanstack/react-query';
import { userDataConnected } from '@/lib/features/queryFunctions/userFunctions';




const HeaderMenu = () => {

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        setToken(typeof window !== 'undefined' ? localStorage.getItem("token") : null);
    }, []);

    const { data: userData, isLoading, error, isSuccess, isError } = useQuery({
        queryKey: ["userConnected"],
        queryFn: async () => {
            if (token) {
                return await userDataConnected(token);
            }
            return null;
        },
        enabled: Boolean(token),
        refetchOnMount: false,

    })


    useEffect(() => {
        if (userData) console.log(userData);

    }, [isSuccess, userData]);


    if (isLoading) return <Loading />

    if (error) return <div>Il y a une erreur ... </div>


    return (
        <div className='flex flex-row items-center justify-center w-[10%] lg:w-[20%]'>
            <div className='hidden lg:flex flex-row items-center gap-3'>
                {(userData?.userRole !== "user") && <Link href="/validationAnnonce">
                    <div className='flex flex-col items-center justify-center underline-offset-8 decoration-2 decoration-orange-500 hover:underline hover:transition-all cursor-pointer hover:text-orange-500 text-lg'>
                        <GrValidate />
                        <p>Validation Article</p>
                    </div>
                </Link>}

                <Link href="/favori">
                    <div className='flex flex-row items-center justify-center underline-offset-8 decoration-2 decoration-orange-500 hover:underline cursor-pointer hover:text-orange-500 text-lg'>
                        <CiHeart />
                        <p>Favoris</p>
                    </div>
                </Link>
                {(!userData) ? <Link href="/connection">
                    <div className='flex flex-col items-center justify-center underline-offset-8 decoration-2 decoration-orange-500 hover:underline hover:transition-all cursor-pointer hover:text-orange-500 text-lg'>
                        <HiOutlineUser />
                        <p className='text-center'>Se connecter</p>
                    </div>
                </Link> :
                    <Link href="/profil" className='hover:scale-110'>
                        <div className='flex flex-row items-center justify-center gap-1'>
                            <Image src={userData.userPhoto} alt="photo profil" priority width={30} height={30} className='rounded-full w-auto h-auto' />
                            {userData?.userPseudo}
                        </div>
                    </Link>}
            </div>
            <div className='flex lg:hidden'>
                <Menubar className='border-none'>
                    <MenubarMenu>
                        <MenubarTrigger id='dot_bouton' aria-label='dot_bouton'><HiDotsVertical className='text-xl' /></MenubarTrigger>
                        <MenubarContent className='border-none z-10'>
                            {(userData?.userRole !== "user") && <Link href="/validationAnnonce">
                                <MenubarItem className='flex flex-row items-center justify-center gap-1'>
                                    <GrValidate />
                                    <p>Validation Article</p>
                                </MenubarItem>
                            </Link>}
                            <Link href="/favori">
                                <MenubarItem className='flex flex-row items-center justify-center gap-1'>
                                    <CiHeart className='text-lg' />
                                    <p>Favoris</p>
                                </MenubarItem>
                            </Link>
                            {(!userData) ? <Link href="/connection">
                                <MenubarItem className='flex flex-row items-center justify-center gap-1'>
                                    <HiOutlineUser className='text-lg' />
                                    <p>Se connecter</p>
                                </MenubarItem>
                            </Link> :
                                <Link href="/connection">
                                    <MenubarItem className='flex flex-row items-center justify-center gap-1'>
                                        <Image src={userData.userPhoto} alt="photo profil" priority width={30} height={30} className='rounded-full w-auto h-auto' />
                                        {userData?.userPseudo}
                                    </MenubarItem>
                                </Link>}
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>
        </div>
    )
}

export default HeaderMenu
