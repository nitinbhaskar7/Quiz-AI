import mongoose,{Schema} from "mongoose";

const OptionSchema = new Schema({
    questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        // required: true,
    },
    quizId: {
        type: Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    content: {
        type:String,
        required: true,
    },
}) ;

export default mongoose.models.Option ||  mongoose.model("Option", OptionSchema);
