import mongoose,{Schema} from "mongoose";

const QuestionSchema = new Schema({
    quizId : {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: [{
        type: Schema.Types.ObjectId,
        ref: "Option",
        // required: true,
    }
] ,
    correctOption: {
        type: Schema.Types.ObjectId,
        ref: "Option",
        // required: true,
    },
    explaination : {
        type : String ,
        required : false 
    }
},
{
    timestamps: true,
});

export default mongoose.models.Question ||  mongoose.model("Question", QuestionSchema);
