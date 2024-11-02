"use client"
import CardWrapper from '@/components/auth/cardwrapper'
import {RegisterSchema } from '@/schema/index'
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
import {register} from '@/actions/register'

const RegisterForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      register(values).then((data)=>{
        setError(data.error)
        setSuccess(data.success)
      })     
    })
  }

  return (
    <CardWrapper
     headerLabel='Create an account'
     backButtonLabel='Already have an account?'
     backButtonHref='/auth/login'
     showSocails
      >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input placeholder="testdev" 
                {...field}
                disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
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
        <FormError errormessage={error}/>
        <Formsuccess successmessage={success}/>
        <Button type="submit" size="lg" className='w-full'>Create an Account</Button>
      </form>
    </Form>

    </CardWrapper>
  )
}

export default RegisterForm
