import {Resend} from"resend";
const resend=new Resend(process.env.RESEND_API_KEY);
export const sendVerificationEmail=async(email:string,token:string)=>{
   const conformlink=`http://localhost:3000/auth/new-verification?token=${token}`
   resend.emails.send({
       from:"onboarding@resend.dev",
       to:email,
       subject:"Verify your email",
       html:`<p>Click<a href="${conformlink}">here</a> to verify your email</p>`,//conformlink 
   })
}
