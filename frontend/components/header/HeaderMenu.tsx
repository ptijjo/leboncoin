"use client"
import React, { useEffect } from 'react';
import { HiOutlineUser } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger, } from "@/components/ui/menubar";
import { HiDotsVertical } from "react-icons/hi";
import Link from 'next/link';
import { UserData } from '@/lib/UserData';
import Image from 'next/image';
import { Dispatch, Selector } from '@/lib/features/hooks';
import { login, selectUser, selectUserStatus } from '@/lib/features/user/userSlice';

const HeaderMenu = () => {

    const dispatch = Dispatch();
    const userData: UserData = Selector(selectUser);
    const status: string = Selector(selectUserStatus);
    const token: string | null = typeof window !== 'undefined' ? localStorage.getItem("token") as string : null;


    useEffect(() => {
        if (status === 'idle' && token !== null) {
            dispatch(login(token as string));
        }
        else return
    }, [token, status, dispatch]);

    if (status === "loading") {
        return "loading ..."
    }


    return (
        <div className='flex flex-row items-center justify-center w-[10%] lg:w-[20%]'>
            <div className='hidden lg:flex flex-row items-center gap-3'>
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
                    <Link href="/profil" className='flex flex-col items-center justify-center hover:scale-110 text-lg'>
                        <div className='flex flex-row items-center justify-center gap-1'>
                            <Image src={userData.userPhoto} alt="photo profil" priority width={30} height={30} className='rounded-full w-auto h-auto' />
                            {userData?.userPseudo}
                        </div>
                    </Link>}
            </div>

            <div className='flex lg:hidden'>
                <Menubar className='border-none'>
                    <MenubarMenu>
                        <MenubarTrigger><HiDotsVertical className='text-xl' /></MenubarTrigger>
                        {(!userData) ? <MenubarContent className='border-none z-10'>
                            <Link href="/favori">
                                <MenubarItem className='flex flex-row items-center justify-center gap-1'>
                                    <CiHeart className='text-lg' />
                                    <p>Favoris</p>
                                </MenubarItem>
                            </Link>
                            <Link href="/connection">
                                <MenubarItem className='flex flex-row items-center justify-center gap-1'>
                                    <HiOutlineUser className='text-lg' />
                                    <p>Se connecter</p>
                                </MenubarItem>
                            </Link>
                        </MenubarContent> :
                            <MenubarContent className='border-none z-10'>
                                <Link href="/favori">
                                    <MenubarItem className='flex flex-row items-center justify-center gap-1'>
                                        <CiHeart className='text-lg' />
                                        <p>Favoris</p>
                                    </MenubarItem>
                                </Link>
                                <Link href="/profil">
                                    <MenubarItem className='flex flex-row items-center justify-center gap-1'>
                                    <Image src={userData.userPhoto} alt="photo profil" priority width={20} height={20} className='rounded-full w-auto h-auto' />
                                        {userData?.userPseudo}
                                    </MenubarItem>
                                </Link>
                            </MenubarContent>}
                    </MenubarMenu>
                </Menubar>
            </div>

        </div>
    )
}

export default HeaderMenu
