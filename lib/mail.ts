import {Resend} from"resend";
console.log(process.env.RESEND_API_KEY)
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

export const sendPasswordResetEmail=async(email:string,token:string)=>{
    const resetlink=`http://localhost:3000/auth/new-password?token=${token}`
    resend.emails.send({
        from:"onboarding@resend.dev",
        to:email,
        subject:"Reset your password",
        html:`<p>Click <a href="${resetlink}">here</a> to conform your email</p>`,//conformlink 
    })
 }
 