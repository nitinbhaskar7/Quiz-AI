'use client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
const page = () => {
  const router = useRouter()
  const params = useParams()
  const [questions, setQuestions] = useState<any>([])
  const [title , setitle] = useState<string>('')
  const {data : session} : any = useSession() 
  const [res , setRes] = useState<any>([null,null,null,null,null,null,null,null,null,null])
  const [error , setError] = useState<string>('')
  useEffect(() => {
        
        axios.post(`/api/getquiz` , {
          quizid : params.quizid
        }).then((res) => {
          setQuestions(res.data.quiz[0].questions)
          setitle(res.data.quiz[0].title)
    }).catch ((error) => {
      console.log(error)
      setError('Something went wrong')
    }) 
  }, [])
  if(!params){
    return <div>Loading...</div>
  }
  const handleSubmit = async(e: any) => {
    e.preventDefault()
    if(res.includes(null)){
      setError('Please answer all questions') ;
      return
    }
    {
      setError('')
      try {
        const response  = await axios.post(`/api/evaluatequiz` , {
        quizId : params.quizid ,
        selectedOptionIds : res ,
        userId : session?.user?._id  
      }) 
      console.log(response)
      router.push(`/`)
    }
      catch (error) {
        setError('Something went wrong')
      }
    }
  }
  return (
    <div className="p-4 max-w-3xl mx-auto dark:bg-gray-800 dark:text-white">
      <form onSubmit={(e)=>{handleSubmit(e)}}  className="p-4 border rounded-lg shadow-sm dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        {
          questions.map((question : any,index : number) => (
            <div key={question._id} className="mb-6 p-4 border rounded-lg shadow-sm dark:border-gray-700">
              <h3 className="text-lg font-medium mb-2">{`${index+1}. ${question.question}`}</h3>
              {
                question.options.map((option : any) => (
                  <div key={option._id} onClick={(e)=>{
                    const newRes = [...res]
                    newRes[index] = option._id
                    setRes(newRes)
                  }} className={`p-2 border rounded-lg mb-2 cursor-pointer ${res[index] == option._id ? "bg-black border-blue-500 text-white dark:bg-gray-700" : "bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-700"}`}>
                    <p>{option.content}</p>
                  </div>
                ))
              }
            </div>
          ))
        }
        {
          <Button type="submit" disabled={res.includes(null)}>Submit</Button>
        }
       
      </form>
    </div>
  )
}

export default page
