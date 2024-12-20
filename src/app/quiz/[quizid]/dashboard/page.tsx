'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useSession } from 'next-auth/react'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const page = () => {

    const params = useParams()
    const router = useRouter()
    const [results, setresults] = useState([])
    const [resultsToggle, setresultsToggle] = useState(false)
    const handleDelete = async (e: any) => {
        try {
            await axios.post(`/api/deletequiz`, {
                quizid: params.quizid
            })
            router.push('/')
        } catch (error) {
            console.log(error);

        }
    }
    const { data: session }: any = useSession()
    useEffect(() => {
        // check if the user logged in is the creator of the quiz
        if (!session) {
            return
        }
        const res = axios.post(`/api/checkquiz`, {
            quizid: params.quizid,
            user: session.user._id
        }).then((res) => {
            setresultsToggle(res.data.viewResults)
        }).catch((error) => {
            // router.push('/not-found')
            console.log(error)
        })





        axios.post(`/api/getallscores`, {
            quizid: params.quizid
        }).then((res) => {
            console.log(res.data.results)
            if (res.data.results)
                setresults(res.data.results)
        }).catch((error) => {
            console.log(error)
        })
    }, [session])

    const changeResultsToggle = async (e: any) => {
        try {
            setresultsToggle(()=>{return !resultsToggle})
            await axios.patch(`/api/toggleresults`, {
                quizid: params.quizid
            })

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-gray-900">
            <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-gray-200">Quiz Dashboard</h1>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">Quiz ID: {params.quizid}</p>
            <Input
                value={`${process.env.NEXT_PUBLIC_DOMAIN}/quiz/${params.quizid}`}
                readOnly
                className="mb-6 w-full max-w-md p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            />
            <div className="flex space-x-4 mb-6">
                <Button
                    onClick={(e) => { navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_DOMAIN}/quiz/${params.quizid}`) }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition duration-300"
                >
                    Copy Link
                </Button>
                <Button
                    onClick={() => { router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/quiz/${params.quizid}`) }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition duration-300"
                >
                    Go to Quiz
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition duration-300'>
                        Delete
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your quiz
                                and remove the data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={(e) => {
                                console.log("clicked delete")
                                handleDelete(e)
                            }}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode"checked={resultsToggle} onCheckedChange={(e)=>{
                        changeResultsToggle(e)
                    }}/>
                    <Label htmlFor="airplane-mode">Allow users to view results</Label>
                </div>
            </div>
            <NeonGradientCard>
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Responses</h2>
                <div className="flex flex-col space-y-4">
                    {
                        results.length > 0 ? results.map((result: any, index) => {
                            return (
                                <div key={index} className="flex justify-between items-center p-4 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition duration-300" onClick={() => { router.push(`/quiz/${params.quizid}/result/${result.user._id}`) }}>
                                    <div>
                                        <p className="text-md text-gray-600 dark:text-gray-400">Username: {result.user.name}</p>
                                        <p className="text-md text-gray-600 dark:text-gray-400">Email: {result.user.email}</p>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{result.score}</p>
                                </div>
                            )
                        }) : <p className="text-gray-500 dark:text-gray-400">No responses yet</p>
                    }
                </div>
            </NeonGradientCard>
        </div>
    )
}

export default page
