import { dbConnect } from "@/helper/dbConnect"
import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/quiz.collection";
import { sampleQuiz } from '@/samples/questionSample'
import User from "@/models/user.collection";
import Option from "@/models/option.collection";
import Question from "@/models/question.collection";
export async function POST(request: NextRequest) {
    try {
        const { grade, subject, chapter, email } = await request.json();
        const db = dbConnect();
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
        const res = sampleQuiz;
        //    my res is an array of questions 
        // each question contains a question , options , correct answer, TODO : explainations 
        //  we will save this in the database under questions collection , options collection 
        //  and quiz collection
        const questionIds : any = [];
        const newQuiz = await Quiz.create({
            questions: questionIds,
            title: "Sample Quiz",
            createdBy : user._id
        })
        for (let i = 0; i < res.length; i++) {
            const questionInfo = res[i];
            const optionIds : any= [];
            let correctOption = 0;
            const newQuestion = await Question.create({
                question: questionInfo.question,
                options: optionIds,
                // correctOption: correctOption,
                quizId : newQuiz._id
            })
            for (let j = 0; j < questionInfo.options.length; j++) {
                const optionContent = questionInfo.options[j];
                const newOption = await Option.create({
                    content: optionContent,
                    questionId : newQuestion._id,
                    quizId : newQuiz._id
                })
                if (j == questionInfo.correctOption) {
                    correctOption = newOption._id;
                }
                optionIds.push(newOption._id);
            }
             await Question.findByIdAndUpdate(newQuestion._id,{
                question: questionInfo.question,
                options: optionIds,
                correctOption: correctOption,
                quiz : newQuiz._id
            })
            questionIds.push(newQuestion._id);
        }

        await Quiz.findByIdAndUpdate(newQuiz._id , {
            questions: questionIds,

        })
        return NextResponse.json({
            message: "Quiz created successfully",
            quidId : newQuiz._id
        }, {status: 200});

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