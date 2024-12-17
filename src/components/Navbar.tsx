'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
import { ModeToggle } from './ui/mode-toggle'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
const Navbar = () => {
    const router = useRouter();
    const { data: session } = useSession();

    return (
        <div className="bg-none shadow-lg sticky top-0 backdrop-blur-md bg-opacity-50">
            <nav className="mx-auto">
                <ul className="list-none m-0 p-0 flex items-center justify-between ">
                    <li className='flex'>
                        <button className='px-10 py-2 font-bold text-xl' onClick={()=>router.push("/generatequiz")}>Start a Quiz</button>
                    </li>
                    <li className='flex items-center'>
                        <button
                            onClick={() => router.push('/')}
                            className='px-10 py-2 text-[30px] font-bold '
                        >
                            Virtual Classroom
                        </button>
                    </li>
                    <li className='flex'>
                        {
                            session ?
                            <DropdownMenu>
                                <DropdownMenuTrigger>Profile</DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel className='cursor-pointer' onClick={()=>{router.push('/profile')}}>My Dashboard</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild onClick={() => signOut()}>
                                        <Button variant={"destructive"}>Logout</Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            :
                            <button className='px-8 py-2 font-bold text-xl'
                                onClick={() => router.push('/login')}
                            >
                                Login
                            </button>
                        }
                        <div className='flex items-center'>
                            <ModeToggle />
                        </div>
                    </li>
                </ul>
            </nav>
            <div className='h-[0.75px] opacity-50 w-[90%] m-auto bg-white'></div>
        </div>
    )
}

export default Navbar
