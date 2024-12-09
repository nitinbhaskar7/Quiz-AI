


import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';



export async function POST(request : NextRequest){
    
    const { grade , subject, chapter}= await request.json();

  try{const lmstudio = createOpenAI({
    name: 'lmstudio',
    apiKey: 'not-needed',
    baseURL: 'http://localhost:1234/v1',
  });
  
  const text = await generateText({
    model: lmstudio('llama-3.2-1b'),
    prompt: `Suggest me 5 mcqs for a quiz website from cbse class ${grade} ${subject} from the chapter ${chapter} and each question is seprated by || keep the questions fun but respectful without numbering plain like a paragraph and keep them short. Don't generate anything else`,
  });

  return NextResponse.json({ 
    message: "Questions generated successfully",
    text}
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