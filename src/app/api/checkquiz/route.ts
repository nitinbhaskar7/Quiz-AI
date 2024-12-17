import Quiz from "@/models/quiz.collection";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "@/helper/dbConnect";
export async function POST(request : NextRequest) {
    try {
      dbConnect();
        const { quizid , user  } : {quizid : string , user : any} = await request.json();
        const quiz = await Quiz.findById(quizid) ;
        if(!quiz){
            return NextResponse.json({
                message : "Quiz not found",
                quiz : false 
            } , {
                status : 400
            })
        }
        if(quiz.viewResults == false && quiz.createdBy != user) {
            return NextResponse.json({
                message : "You are not authorized to view this quiz",
                quiz : false
            } , {
                status : 401
            })
        }
        //   )
        return NextResponse.json({
            message : "Quiz fetched successfully",
            quiz : true,
            viewResults : quiz.viewResults
        }, {
            status : 200
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