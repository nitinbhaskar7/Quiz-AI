'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-full max-w-md p-4">
            <CardHeader>
                <CardTitle className='text-center'>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={(e)=>signIn('google')} className="w-full">
                    Login with Google
                </Button>
            </CardContent>
        </Card>
    </div>
  )
}

export default page
