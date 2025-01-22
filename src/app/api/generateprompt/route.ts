import { dbConnect } from "@/helper/dbConnect"
import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/quiz.collection";
import { sampleQuiz } from '@/samples/questionSample'
import User from "@/models/user.collection";
import Option from "@/models/option.collection";
import Question from "@/models/question.collection";
import axios from "axios";
export async function POST(request: NextRequest) {
    try {
        const { prompt, email } = await request.json();
        dbConnect();
        /*
            LLM part 
        */
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({
                message: "User not found",
            },
                {
                    status: 401
                }
            )
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/promptgen`, {
            prompt
        });
        console.log(response.data);
        return NextResponse.json({
            message: "Quiz created successfully",
            quiz: response.data
        }, { status: 200 });

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            message: "Error creating quiz",
            error
        },
            {
                status: 401
            }
        )
    }
}