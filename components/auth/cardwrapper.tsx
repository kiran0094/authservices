"use client"
import HeaderLabel from "./header"
import BackButton from "./backbutton"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
     } from "../ui/card"
import Socail from "./socails"


interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocails?: boolean
}
const CardWrapper = ({children, headerLabel, backButtonLabel, backButtonHref, showSocails}: CardWrapperProps) => {

    return(
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <HeaderLabel label={headerLabel}/>
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
            {showSocails && <CardFooter>
                <Socail/>
            </CardFooter>}
            <CardFooter>
                <BackButton
                href={backButtonHref}
                label={backButtonLabel}/>
            </CardFooter>
        </Card>
    )
}

export default CardWrapper