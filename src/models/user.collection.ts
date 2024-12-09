import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

export default mongoose.models.User ||  mongoose.model("User", UserSchema);
