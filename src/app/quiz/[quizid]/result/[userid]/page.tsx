'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { set } from 'mongoose'
const page = () => {

    const params = useParams()
    const [questions, setQuestions] = useState<any>([])
    const [title, setitle] = useState<string>('')
    const { data: session }: any = useSession()
    const [selectedOptions, setSelectedOptions] = useState<any>([])
    const [correctOptions, setCorrectOptions] = useState<any>([])
    const [explainations, setExplainations] = useState<any>([])
    const [score, setscore] = useState<number>(0)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        // only the creator of the quiz can view the results
        
       

        axios.post(`/api/getquiz`, {
            quizid: params.quizid
        }).then((res) => {
            setQuestions(res.data.quiz[0].questions)
            setitle(res.data.quiz[0].title)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (!session) {
            return
        }
        axios.post(`/api/checkquiz`, {
            quizid: params.quizid,
            user: session?.user?._id
        }).then((res) => {
            console.log(res.data)
        }).catch((error) => {
            setError('You are not authorized to view this page')
        })
        const getResults = async () => {
            await axios.post(`/api/getresults`, {
                quizId: params.quizid,
                userId: params.userid
            }).then((res) => {
                setCorrectOptions(res.data.correctOptionIds)
                console.log(res.data.correctOptionIds)
                setSelectedOptions(res.data.selectedOptionIds)
                setscore(res.data.result)
                setExplainations(res.data.explainations)
                console.log(res.data)
            }).catch((error) => {
                setError(error.response.data.message)
            }
            )
        }
        getResults()
    }, [session])

    if (!params) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div className="text-center text-red-500 dark:text-red-400">{error}</div>
    }

    return (
        <>
            <h1 className="text-4xl font-extrabold mb-4 text-center text-blue-600 dark:text-blue-400">{title}</h1>
            <h2 className='text-2xl font-semibold mb-6 text-center text-gray-700 dark:text-gray-300'>Your Results: {score}</h2>
            {

                questions.map((question: any, index: number) => (
                    <div key={question._id} className="mb-6 p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{`${index + 1}. ${question.question}`}</h3>
                        {
                            question.options.map((option: any) => (
                                <div key={option._id} className={`p-3 border rounded-lg mb-2 cursor-pointer transition-colors duration-300 ${selectedOptions[index] && correctOptions[index] && (option._id == selectedOptions[index] && option._id != correctOptions[index].correctOption ? 'bg-red-400 dark:bg-red-600' : option._id === correctOptions[index].correctOption ? "bg-green-400 dark:bg-green-600" : "dark:bg-gray-700")}`}>
                                    <p className="text-gray-700 dark:text-gray-300">{option.content}</p>
                                </div>
                               
                            ))
                            
                        }
                        { explainations.length > 0 && (
                            <div className="mt-4 p-4 border-t border-gray-300 dark:border-gray-600">
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Explanation:</h4>
                                <p className="text-gray-700 dark:text-gray-300 mt-2">{explainations[index].explaination}</p>
                            </div>
                        )}
                    </div>
                ))
            }
        </>
    )
}

export default page
