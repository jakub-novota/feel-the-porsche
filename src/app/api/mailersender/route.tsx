import { NextResponse } from 'next/server';
import { SendEmail } from '@/app/Modules/MailerSender/SendMail'

export async function POST(req: any, res: any) {
    const data = await req.json();
    console.log("Recived", data)
    SendEmail(data.name, data.email, data.message);
    return NextResponse.json("Email sent");
}