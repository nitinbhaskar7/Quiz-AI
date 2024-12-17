'use client'
import React, {useEffect, useState} from 'react'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ScoreChart from '@/components/Chart'
const Profile = () => {
  const {data : session} : any= useSession() ;
  const router = useRouter() 
  // if(!session) return null ;
  console.log(session?.user?.image)
  const [attemptedQuizzes, setAttemptedQuizzes] = useState([])
  const [createdQuizzes, setCreatedQuizzes] = useState([])
  const [error , setError] = useState('')
  const [avg, setAvg] = useState(0)

  useEffect(() => {
    if(!session) return ;
    axios.post('api/getprofile', {
        userid : session?.user?._id
    }).then((response) => {
        setAttemptedQuizzes(response.data.attemptedQuizzes)
        // quiz inside that has results inside that match the user id and then get the average score
        let sum = 0
        let count = 0
        response.data.attemptedQuizzes.forEach((quiz : any) => {
          quiz.results.forEach((result : any) => {
            if(result.user == session.user._id) {
              sum += result.score
              count++
            }
          })
        })
        setAvg(sum/count)
        setCreatedQuizzes(response.data.createdQuizzes)
    }).catch((error) => {
        setError('Error fetching profile')
        console.log(error)
    })
    
  }, [session]) 

    if(error) return <div>{error}</div>
  return (
    <>

    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {session?.user?.image && <Image src={session?.user?.image} width={50} height={50} className='rounded-lg' alt="User Profile Image" /> }
      <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
      <h2 className="text-xl">{session?.user?.email}</h2>
      <h3 className="text-lg mt-4">Attempted Quizzes</h3>
      <div className="w-full max-w-md">

        {attemptedQuizzes.length > 0 ?
        <>

         {attemptedQuizzes.map((quiz : any) => {
           return (
             <div key={quiz._id} onClick={()=>{router.push(`/quiz/${quiz._id}/result/${session.user._id}`)}} className="cursor-pointer hover:bg-gray-200 hover:dark:text-black p-2 rounded-lg mb-2">
              {quiz.title}
            </div>
          )
        }) }
          <ScoreChart avg={avg}/> 
        </>
        :  
        <div className='text-center'>No quizzes attempted yet</div>
      }
    

      </div>
      <h3 className="text-lg mt-4">Created Quizzes</h3>
      <div className="w-full max-w-md">
        {createdQuizzes.length > 0 ? createdQuizzes.map((quiz : any) => {
          return (
            <div key={quiz._id} onClick={(e)=>{router.push(`/quiz/${quiz._id}/dashboard`)}} className="cursor-pointer hover:bg-gray-200 hover:dark:text-black p-2 rounded-lg mb-2">
              {quiz.title}
            </div>
          )
        }) : <div className='text-center'>No quizzes created yet</div>
      }
      </div>

    </div>
      </>
  )
}

export default Profile
