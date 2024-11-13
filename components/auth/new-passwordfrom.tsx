"use client"
import CardWrapper from '@/components/auth/cardwrapper'
import {New_password} from '@/schema/index'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { FormError, Formsuccess } from '../formresult'
import { useState, useTransition } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSearchParams } from 'next/navigation'
import { newPassword } from '@/actions/new-password'

const NewPasswordFrom= () => {
    const searchParams=useSearchParams();
    const token=searchParams.get("token")
    console.log(token)
  
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof New_password>>({
    resolver: zodResolver(New_password),
    defaultValues: {
      password: "",
    },
  })
  const onSubmit = (values: z.infer<typeof New_password>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
        newPassword(values,token).then((data)=>{
        if (data) {
          console.log("error info",data)
          setError(data?.error)
          // TODO:success
          setSuccess(data?.success)
        }
      })     
     
    })
  }

  return (
    <CardWrapper
     headerLabel='Enter new password'
     backButtonLabel='back to login'
     backButtonHref='/auth/login'
     >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="******" 
                {...field}
                disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />        
        <FormError errormessage={error}/>
        <Formsuccess successmessage={success}/>
        <Button type="submit" size="lg" className='w-full'>conform password</Button>
      </form>
    </Form>

    </CardWrapper>
  )
}

export default NewPasswordFrom

