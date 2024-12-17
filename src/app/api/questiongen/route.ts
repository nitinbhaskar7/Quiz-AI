import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import {z} from 'zod';
import { ChatMistralAI } from "@langchain/mistralai";
import {ChatGroq} from "@langchain/groq"
export async function POST(request : NextRequest){
    
    const { grade , subject, chapter}= await request.json();

  try{
    const model = new ChatGroq({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      maxTokens: undefined,
      // other params...
    });
    
    // const model = new ChatMistralAI({
    //   model: "mistral-large-latest",
    //   temperature: 0.2
    // });
    const quiz = 
        
          z.object({

            questions : z.array(z.object({
              question: z.string().describe(`The question to be asked from CBSE syllabus from ${grade} grade ${subject} subject ${chapter} chapter`),
              options: z.array(z.string()).min(2).describe("The 4 options for the question"),
              correctOption: z.number().int().nonnegative().describe("The correct option for the question just the index of the options array"),
              explaination : z.string().describe('A brief and detailed 2 line explaintation for the correct answer to the question')
            }))
          })
      //  ).describe("The array of MCQs generated from the given input");
      
      const structuredLlm = model.withStructuredOutput(quiz , {name : "quiz" });
      const arr = `Generate 10 difficult MCQs from ${grade} grade ${subject} subject ${chapter} chapter`;
      console.log(arr);
      const res = await structuredLlm.invoke(arr);
      
      return NextResponse.json({ 
        message: "Questions generated successfully",
        questions : res.questions,
      }
    ,{
    status: 200
    }
)
}
catch(error){
  console.log(error)
  return NextResponse.json({
    message: "Error generating questions",
    error: error
  },{
    status: 500
  })
}
}