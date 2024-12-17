import { dbConnect } from "@/helper/dbConnect";
import Quiz from "@/models/quiz.collection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) { 
    try {
        dbConnect() ;
        const { userid } = await request.json()
        console.log(userid)
        const attemptedQuizzes = await Quiz.find({attemptedBy : userid})
          // Gives all the quizzes attempted by the given user )
        const createdQuizzes = await Quiz.find({createdBy : userid} );
                       // Gives all the quizzes created by the given user )
        console.log(attemptedQuizzes)
        return NextResponse.json({
            attemptedQuizzes : attemptedQuizzes,
            createdQuizzes : createdQuizzes
        }, {status : 200})
    } catch (error) {
        return NextResponse.json({
            message : "Error fetching profile",
            error : error
        } , {
            status : 500 
        })
    }
}