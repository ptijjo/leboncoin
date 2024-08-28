"use client"
import React from 'react';
import { HiOutlineUser } from "react-icons/hi2";
import { CiHeart } from "react-icons/ci";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger, } from "@/components/ui/menubar";
import { HiDotsVertical } from "react-icons/hi";
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { UserData } from '@/lib/UserData';

const HeaderMenu = () => {

    const queryClient = useQueryClient();
    const userData: UserData | undefined = queryClient.getQueryData(['userData']);

    console.log(userData?.userPseudo)

    return (
        <div className='flex flex-row items-center justify-center w-[10%] lg:w-[20%]'>
            <div className='hidden lg:flex flex-row items-center gap-3'>
                <Link href="/favori">
                    <div className='flex flex-col items-center justify-center underline-offset-8 decoration-2 decoration-orange-500 hover:underline cursor-pointer hover:text-orange-500 text-lg'>
                        <CiHeart />
                        <p>Favoris</p>
                    </div>
                </Link>
                {(userData === undefined) ? <Link href="/connection">
                    <div className='flex flex-col items-center justify-center underline-offset-8 decoration-2 decoration-orange-500 hover:underline hover:transition-all cursor-pointer hover:text-orange-500 text-lg'>
                        <HiOutlineUser />
                        <p className='text-center'>Se connecter</p>
                    </div>
                </Link> :
                    <Link href="/connection" className='border flex flex-col items-center justify-center underline-offset-8 decoration-2 decoration-orange-500 hover:underline hover:transition-all cursor-pointer hover:text-orange-500 text-lg relative'>
                        <div className='absolute -top-[30px] left-[5px] flex flex-col items-center justify-center'>
                            <img src={userData.userPhoto} alt="photo" className='rounded-full w-[25px]' />
                            {userData?.userPseudo}
                        </div>
                    </Link>}
            </div>

            <div className='flex lg:hidden'>
                <Menubar className='border-none'>
                    <MenubarMenu>
                        <MenubarTrigger><HiDotsVertical className='text-xl' /></MenubarTrigger>
                        {(userData === undefined) ? <MenubarContent className='border-none z-10'>
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
                                <Link href="/connection">
                                    <MenubarItem className='flex flex-row items-center justify-center gap-1'>
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
