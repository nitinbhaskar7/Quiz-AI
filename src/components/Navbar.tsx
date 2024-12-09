'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Button } from './ui/button'
const Navbar = () => {
  const router = useRouter();
    const {data : session} = useSession();

  return (
    <div className="bg-black shadow-lg">
        <nav className="container mx-auto p-4">
            <ul className="list-none m-0 p-0 flex justify-center items-center space-x-4">
                <li>
                    <Button 
                        className="text-white text-sm py-2 px-4 text-center hover:text-gray-400 transition duration-300 ease-in-out"
                        onClick={() => router.push('/')}
                    >
                        Home
                    </Button>
                </li>
                <li>
                    <Button 
                        className="text-white text-sm py-2 px-4 text-center hover:text-gray-400 transition duration-300 ease-in-out"
                        onClick={() => router.push('/profile')}
                    >
                        {session && "Profile"}
                    </Button>
                </li>
                <li>
                    {
                        session? 
                        <Button variant={"destructive"} onClick={()=>{signOut()}}>
                            Logout
                        </Button>
                        :
                        <Button 
                        className="text-white text-sm py-2 px-4 text-center hover:text-gray-400 transition duration-300 ease-in-out"
                        onClick={() => router.push('/login')}
                        >
                        LogIn
                    </Button>
                    }
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
