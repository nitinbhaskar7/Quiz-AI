import { dbConnect } from "@/helper/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/quiz.collection";
import User from "@/models/user.collection";
import Option from "@/models/option.collection";
import Question from "@/models/question.collection";

export async function POST(request: NextRequest) {
    try {
        const { grade, subject, chapter, email, response } = await request.json();
        await dbConnect(); // Ensure the database connection is established

        const res = response.questions; // Array of questions
        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json({
                message: "User  not found",
            }, {
                status: 401
            });
        }

        const questionIds : any = [];
        const optionPromises = []; // Array to hold option creation promises
        const questionPromises = []; // Array to hold question creation promises

        // Create a new quiz
        const newQuiz = await Quiz.create({
            title: `${grade || "Self Generated Quiz"} ${subject || "" } ${chapter || ""} Quiz - ${new Date().toLocaleDateString()}`,
            createdBy: user._id,
            questions: [] // Placeholder for question IDs
        });

        // Loop through each question
        for (const questionInfo of res) {
            const optionIds : any = [];
            let correctOption : any = null;

            // Create options for the question
            for (const [index, optionContent] of questionInfo.options.entries()) {
                const optionPromise = Option.create({
                    content: optionContent,
                    quizId: newQuiz._id // Associate option with quiz
                }).then(newOption => {
                    optionIds.push(newOption._id);
                    if (index === questionInfo.correctOption) {
                        correctOption = newOption._id; // Store the correct option ID
                    }
                });
                optionPromises.push(optionPromise);
            }

            // Create the question after all options are created
            const questionPromise = Promise.all(optionPromises).then(() => {
                return Question.create({
                    question: questionInfo.question,
                    options: optionIds,
                    correctOption: correctOption,
                    quizId: newQuiz._id,
                    explaination: questionInfo.explaination
                });
            }).then(newQuestion => {
                questionIds.push(newQuestion._id); // Store the question ID
            });

            questionPromises.push(questionPromise);
        }

        // Wait for all questions and options to be created
        await Promise.all(questionPromises);

        // Update the quiz with the question IDs
        await Quiz.findByIdAndUpdate(newQuiz._id, {
            questions: questionIds,
        });

        return NextResponse.json({
            message: "Quiz saved successfully",
            quizId: newQuiz._id
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Error saving quiz",
            error
        }, {
            status: 401
        });
    }
}