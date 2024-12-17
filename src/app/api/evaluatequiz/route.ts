import { dbConnect } from "@/helper/dbConnect";
import Quiz from "@/models/quiz.collection";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
    try {
        const {quizId , selectedOptionIds , userId } = await request.json() ; 

         dbConnect() ;
        const quiz = await Quiz.findById(quizId) ; 
        
        // update the user's score
        // get the array of correct optionIds for the quiz 

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
                      'correctOption': true
                    }
                  }
                ]
              }
            }
          ])
        
          const correctOptionIds = quiz_updated[0].correctOptions;
            console.log(correctOptionIds) ;
            console.log(selectedOptionIds) ;
        // calculate the score
        let score = 0 ;
        selectedOptionIds.forEach((selectedOptionId : any , index : number) => {
            if(selectedOptionId === correctOptionIds[index].correctOption.toString()){
                score++ ;
            }
        })
        console.log(score) ;

        // update the quiz results
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId , {
            $push : {
                results : {
                    user : userId ,
                    score : score,
                    selectedOptionIds : selectedOptionIds,
                },
                attemptedBy : userId
            },
            
                
        }

        )

        return NextResponse.json({
            message : "Quiz evaluated successfully",
            score : score,
            correctOptionIds : correctOptionIds,
            selectedOptionIds : selectedOptionIds
        } , {
            status : 200
        })
        
    } catch (error) {
        return NextResponse.json({
            message : "Error evaluating quiz",
            error : error
        } , {
            status : 500
        })
    }
}