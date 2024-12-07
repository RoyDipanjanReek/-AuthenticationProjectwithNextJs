import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";

connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const{email} = reqBody
        console.log(reqBody);      
        
        const existedEmail = await User.findOne({email})

        if (!existedEmail) {
            console.log("Email dose not exist");
            return NextResponse.json(
                {error: "User's email dose not exist"},
                {status:400},
            )
        }

         await sendEmail({email, emailType: "RESET", userId: existedEmail._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
        })
        
    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500})
    }
}
