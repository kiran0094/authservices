import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import{ExclamationTriangleIcon, CheckCircledIcon}from "@radix-ui/react-icons"

export const Google = () => {
  return (
    <FcGoogle />    
  )
}

export const Github = () => {
    return (
      <FaGithub />    
    )
  }
  export const Errortriangle = () => {
    return (
      <ExclamationTriangleIcon className="h-4 w-4" />
      
    )
  }

  export const Successcircle = () => {
    return (
      <CheckCircledIcon className="h-4 w-4" />
      
    )
  }


