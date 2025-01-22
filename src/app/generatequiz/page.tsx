'use client'
import React, { useState } from 'react'
import { Loader2 } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { chapters, grades, subjects } from '@/samples/quizForm'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { NeonGradientCard } from '@/components/ui/neon-gradient-card'
import Particles from '@/components/ui/particles'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Input } from '@/components/ui/input'
const page = () => {
  const [grade, setgrade] = useState<string>('');
  const [chapter, setchapter] = useState<string>('');
  const [subject, setsubject] = useState<string>('');
  const [error, seterror] = useState<any>(null)
  const [loading, setloading] = useState<any>(false)
  const { data: session } = useSession()
  const router = useRouter()
  const [prompt, setprompt] = useState<string>('')
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (grade === '' || subject === '' || chapter === '') {
      seterror('Please fill all the fields')
      return
    } else {
      seterror(null)
      console.log('Quiz generated')
    }
    try {
      setloading(true)
      const response = await axios.post('/api/generatequiz', {
        grade,
        subject,
        chapter,
        email: session?.user?.email
      })
      console.log(response.data.quiz)
      const res = await axios.post('/api/savequiz', {
        grade,
        subject,
        chapter,
        email: session?.user?.email,
        response: response.data.quiz
      }
      )
      console.log(res.data)
      router.push(`/quiz/${res.data.quizId}/dashboard`)

    } catch (error: any) {
      seterror('Something went wrong')
      console.log(error.response)
    } finally {
      setloading(false)
    }
  }

  const handlepromptSubmit = async (e: any) => {
    // e.preventDefault()
    if (prompt == '') {
      seterror('Please fill all the fields')
      return
    } else {
      seterror(null)
      console.log('Quiz generated')
    }
    try {
      setloading(true)
      const response = await axios.post('/api/generateprompt', {
        prompt,
        email: session?.user?.email
      })
      console.log(response.data.quiz)
      const res = await axios.post('/api/savequiz', {
        email: session?.user?.email,
        response: response.data.quiz
      }
      )
      console.log(res.data)
      router.push(`/quiz/${res.data.quizId}/dashboard`)

    } catch (error: any) {
      seterror('Something went wrong')
      console.log(error.response)
    } finally {
      setloading(false)
    }
  }



  return (
    <div className="flex justify-center items-center min-h-screen">
      <Particles
        className="absolute inset-0 "
        quantity={1000}
        ease={80}
        refresh
      />
      <form onSubmit={(e: any) => {
        handleSubmit(e)

      }}>
        <div className='flex justify-between gap-10'>

          <NeonGradientCard className="items-center justify-center text-center">
            <CardHeader>
              <CardTitle className='text-center'>Enter Quiz Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Select onValueChange={(e) => { setgrade(e); setchapter('') }} >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade} >{grade}</SelectItem>)
                    )}
                  </SelectContent>
                </Select>
                <Select disabled={grade === ''} onValueChange={(e) => { setsubject(e); setchapter('') }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      subjects.map((subject) => (
                        <SelectItem key={subject} value={subject} >{subject}</SelectItem>)
                      )
                    }
                  </SelectContent>
                </Select>
                <Select disabled={subject === ''} onValueChange={(e) => setchapter(e)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Chapter" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      subject && grade && chapters[`${subject.toLowerCase()}`][`${grade.toLowerCase()}`].map((chapter: any) => (
                        <SelectItem key={chapter} value={chapter} >{chapter}</SelectItem>)
                      )
                    }
                  </SelectContent>
                </Select>
              </div>


            </CardContent>
            <CardFooter className='flex justify-center items-center flex-col'>
              {!loading ? <Button type='submit' >Generate Quiz</Button> : <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>}
              
              {error && <CardDescription className='text-red-500 mt-2'>{error}</CardDescription>}
            </CardFooter>
          </NeonGradientCard>
          <NeonGradientCard className="items-center justify-center text-center min-w-[700px]">
          <CardHeader>
              <CardTitle className='text-center'><p className='mb-2 font-bold'>Generate your own quiz through a customized prompt</p></CardTitle>
            </CardHeader>
            <CardContent>
              <div className='mt-2 text-center'>
                
                <div className='flex flex-col items-center gap-2'>
                  <Input className='w-full max-w-lg' placeholder='e.g., Generate a quiz on Fabrication of Nanomaterials for I Semester Engineering' 
                  value={prompt} onChange={(e)=>{setprompt(e.target.value)}}/> 
                  {!loading ? <Button type='button' onClick={(e)=>{
                    handlepromptSubmit(e);
                  }} >Generate Quiz</Button> : <Button disabled>
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>}
                </div>
              </div>
              {error && <CardDescription className='text-red-500 mt-2'>{error}</CardDescription>}
            </CardContent>

          </NeonGradientCard>
        </div>
      </form>
    </div>
  )
}

export default page
