import mongoose,{Schema} from "mongoose";

const QuizSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
    }
] ,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    attemptedBy: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    results : [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
            score: {
                type: Number,
            }
        }
    ]
},
{
    timestamps: true,
});

export default mongoose.models.Quiz ||  mongoose.model("Quiz", QuizSchema);
