"use client"
import CardWrapper from '@/components/auth/cardwrapper'
import { LoginSchema } from '@/schema/index'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { FormError, Formsuccess } from '../formresult'
import { useState, useTransition } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {login} from '@/actions/login'
import { useSearchParams } from "next/navigation"

const LoginForm = () => {
  const searchParams=useSearchParams();
  const urlError=searchParams.get("error")==="oauthAccountNotLinked"?"email already use with anthor provider":""

  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
        login(values).then((data)=>{
        if (data) {
          console.log("error info",data)
          setError(data.error)
          // TODO:success
          // setSuccess(data.success)
        }
      })     
     
    })
  }

  return (
    <CardWrapper
     headerLabel='Welcome back'
     backButtonLabel='Dont have an account?'
     backButtonHref='/auth/register'
     showSocails
      >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input placeholder="testdev@gmail.com" 
                {...field}
                disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passward</FormLabel>
              <FormControl>
                <Input placeholder="********" 
                {...field}
                 type="password"
                 disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError errormessage={error || urlError}/>
        <Formsuccess successmessage={success}/>
        <Button type="submit" size="lg" className='w-full'>Login</Button>
      </form>
    </Form>

    </CardWrapper>
  )
}

export default LoginForm
