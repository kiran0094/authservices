"use client"
import CardWrapper from '@/components/auth/cardwrapper'
import { LoginSchema, ResetSchema} from '@/schema/index'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { FormError, Formsuccess } from '../formresult'
import { useCallback, useState, useTransition } from 'react'
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
import {reset} from '@/actions/reset'

const Resetform= () => {
  
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  })
  const onSubmit = useCallback((values: z.infer<typeof ResetSchema>) => {
    setError("")
    setSuccess("")
    startTransition(() => {
      reset(values).then((data)=>{
        if (data) {
          console.log("error info",data)
          setError(data?.error)
          // TODO:success
          setSuccess(data?.success)
        }
        
      })     
      
    })
  },[])
  console.log("rerender")
  
  return (
    <CardWrapper
     headerLabel='conform your email'
     backButtonLabel='back to login'
     backButtonHref='/auth/login'
     >
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormError errormessage={error}/>
        <Formsuccess successmessage={success}/>
        <Button type="submit" size="lg" className='w-full'>send email</Button>
      </form>
    </Form>

    </CardWrapper>
  )
}

export default Resetform

