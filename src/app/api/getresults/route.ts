import { dbConnect } from "@/helper/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/quiz.collection";
import mongoose from "mongoose";
export async function POST(request : NextRequest) {
    try {
        dbConnect() ;
        const {quizId , userId } = await request.json() ;
    
        // get the quiz
        const quiz_updated =  await Quiz.aggregate([
            {
              '$match': {
                '_id': new mongoose.Types.ObjectId(`${quizId}`)
              }
            }, {
              '$lookup': {
                'from': 'questions', 
                'localField': 'questions', 
                'foreignField': '_id', 
                'as': 'correctOptions', 
                'pipeline': [
                  {
                    '$project': {
                      'correctOption': true,
                    }
                  }
                ]
              }
            },
            {
              $lookup : {
                from : 'questions',
                localField : 'questions',
                foreignField : '_id',
                as : 'explainations',
                'pipeline': [
                  {
                    '$project': {
                      'explaination': true,
                      '_id' : false
                    }
                  }
                ]
            }
          }
          ])
        
          const isAttempted = quiz_updated[0].results.filter((result : any) => result.user == userId).length > 0 ;
          if(!isAttempted){
            return NextResponse.json({isAttempted : false , message : "You have not attempted this quiz"} , {status : 400})
          }
          const correctOptionIds = quiz_updated[0].correctOptions ;
          const explainations = quiz_updated[0].explainations
          const selectedOptionIds = quiz_updated[0].results.filter((result : any) => result.user == userId)[0].selectedOptionIds ;
          
          const result = quiz_updated[0].results.filter((result : any) => result.user == userId)[0].score ; 
          // console.log(selectedOptionIds)
          return NextResponse.json({result : result , correctOptionIds ,explainations, selectedOptionIds , isAttempted : true} , {status : 200})
    

    
    } catch (error) {
        console.log(error)
        return NextResponse.json({message : "Internal Server Error"} , {status : 500})
    }



}