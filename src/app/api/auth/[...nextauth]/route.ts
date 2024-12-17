import { authOptions } from "@/helper/authOptions"
import NextAuth from "next-auth"
const handler = NextAuth(authOptions)
export {handler as GET , handler as POST}
// export  async function GET() {
//   return handler
// }
// export async  function POST(){
//   return handler
// }