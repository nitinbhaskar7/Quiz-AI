import Quiz from "@/models/quiz.collection";
import Question from "@/models/question.collection";
import Option from "@/models/option.collection";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
export async function DELETE(request : NextRequest) {
    try {
        const { quizid  } : {quizid : string} = await request.json();
        const res = await Quiz.findByIdAndDelete(quizid) ;
        if(!res){
            return NextResponse.json({
                message : "Quiz not found",
            } , {
                status : 404
            })
        }
        // get all questions with this quiz id and delete them
        // get all options with this quiz id and delete them

        await Question.deleteMany({
            quizId : quizid
        });
        await Option.deleteMany({
            quizId : quizid
        });

        return NextResponse.json({
            message : "Quiz deleted successfully",
            quiz : res
        })

        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message : "Error deleting quiz",
            error : error
        } , {
            status : 500
        })

    }
}