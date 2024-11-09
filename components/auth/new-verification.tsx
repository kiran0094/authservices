"use client"
import { useSearchParams } from 'next/navigation'
import CardWrapper from './cardwrapper'
import {BeatLoader} from 'react-spinners'
import { useCallback, useEffect, useState } from 'react'
import { verifyToken } from '@/actions/verifytoken'
import { FormError, Formsuccess } from '../formresult'

const NewVerification = () => {
  const [error, setError] = useState<string| undefined>()
  const [success, setsuccess] = useState<string| undefined>()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const onsubmit=useCallback(()=>{   
    if(!token){
      setError("missing token")
      return
    }
    verifyToken(token).then((data)=>{
      setError(data?.error)
      setsuccess(data?.success)
    })
    .catch((error)=>{
      setError("something went wrong")
      
    })
  },[token])

  useEffect(() => {
    onsubmit()
  },[onsubmit])
  return (
    <CardWrapper 
    headerLabel='conforming your email'
    backButtonLabel='Back To Login'
    backButtonHref='/auth/login'>
    <div className='flex flex-col items-center justify-center'>
    <BeatLoader speedMultiplier={2} loading={true}/>
     <FormError errormessage={error}/>
     <Formsuccess successmessage={success}/>

    </div>
      
      

    </CardWrapper>
  )
}

export default NewVerification
