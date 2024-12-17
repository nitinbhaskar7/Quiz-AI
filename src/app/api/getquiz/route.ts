import Quiz from "@/models/quiz.collection";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/helper/dbConnect";
export async function POST(request : NextRequest) {
    try {
      dbConnect();
        const { quizid  } : {quizid : string} = await request.json();
        const res = await Quiz.aggregate([
            {
              '$match': {
                    '_id' : new  mongoose.Types.ObjectId(quizid)
              }
            }, {
              '$lookup': {
                'from': 'questions', 
                'localField': 'questions', 
                'foreignField': '_id', 
                'as': 'questions', 
                'pipeline': [
                  {
                    '$lookup': {
                      'from': 'options', 
                      'localField': 'options', 
                      'foreignField': '_id', 
                      'as': 'options'
                    }
                  }
                ]
              }
            }
          ])
        if(res.length == 0){
            return NextResponse.json({
                message : "Quiz not found"
            } , {
                status : 404
            })
        }
        //   )
        return NextResponse.json({
            message : "Quiz fetched successfully",
            quiz : res
        }) ;

        }
         catch (error) {
        console.log(error);
        return NextResponse.json({
            message : "Error fetching quiz",
            error : error
        } , {
            status : 500
        })
    }
}