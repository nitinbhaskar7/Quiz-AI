import { dbConnect } from "@/helper/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Quiz from "@/models/quiz.collection";
import mongoose from "mongoose";
export async function POST(request : NextRequest) {
   try{ dbConnect();
        const { quizid  } = await request.json();
        const res = await Quiz.aggregate([
            {
                '$match': {
                    '_id': new mongoose.Types.ObjectId(`${quizid}`)
                }
            }, {
                $unwind: {
                  path: "$results",
                  preserveNullAndEmptyArrays: false
                }
              },
              {
                $lookup: {
                  from: "users",
                  localField: "results.user",
                  foreignField: "_id",
                  as: "results.user",
                  pipeline : [
                    {
                      $project : {
                        name : true ,
                        email : true
                      }
                    }
                  ]
                }
              },
              {
                $addFields: {
                  "results.user": {
                    $first : "$results.user"
                  }
                }
              },
              {
                $group: {
                  _id: '$_id',
                  results : {
                    $push : '$results'
                  }
                }
              }
              
            ]) 
        console.log(res[0].results)
        if(res.length == 0){
            return NextResponse.json({
                message : "Quiz not found",
                quiz : false 
            } , {
                status : 200
            })
        }
        
        return NextResponse.json({
            message : "Quiz fetched successfully",
            quiz : true,
            results : res[0].results
        }, {
            status : 200
        }) ;}catch(error){

            return NextResponse.json({  message : "Error fetching quiz", error : error } , { status : 200 })
        }

}