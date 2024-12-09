import mongoose from "mongoose";

export const dbConnect = async () => {

   try {
     if(mongoose?.connection?.readyState >= 1){
         console.log("DB Already Connected");
         return;
     }
     await mongoose.connect(process.env.MONGODB_URI!) ;

     console.log("DB Connected");
   } catch (error) {
        console.log("DB Connection Failed");
        console.log(error);
   }
}
