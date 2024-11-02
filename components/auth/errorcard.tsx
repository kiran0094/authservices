import{ExclamationTriangleIcon,}from "@radix-ui/react-icons"

import CardWrapper from "./cardwrapper"


const ErrorCard = () => {
  return (
   <CardWrapper
   headerLabel='Oops something went wrong'
   backButtonLabel='Try again'   
   backButtonHref='/auth/login'
   showSocails={false}>
    <div className="flex flex-col items-center justify-center gap-2">
        <ExclamationTriangleIcon className="text-destructive h-10 w-10"/>

    </div>
   </CardWrapper>
    
  )
}

export default ErrorCard
