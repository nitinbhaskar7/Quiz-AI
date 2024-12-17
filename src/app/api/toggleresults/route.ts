import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/quiz.collection";
import { dbConnect } from "@/helper/dbConnect";
export async function PATCH(request : NextRequest){
  try {
      dbConnect() ;
      const {quizid} = await request.json() ;
      const quiz = await Quiz.findById(quizid) ;
      if(!quiz){
          return NextResponse.json({message: "Quiz not found"}, {status: 404})
      }
      quiz.viewResults = !quiz.viewResults ;
      await quiz.save() ;
      return NextResponse.json({message: "Results Toggled"})
  } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
  }

}