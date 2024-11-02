"use client"
import {useRouter} from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode
    mode?:"model"|"redirect";
    asChild?: boolean;
}

export default function LoginButton({
    children,
    asChild,
    mode="redirect"
}: LoginButtonProps) {
    const router = useRouter()

    if(mode==="model"){
        return(
        <span>todo items</span>
        )
    }

    const onClick = () => {
        console.log("click")
        router.push("auth/login")
    }

    return(
    <span onClick={onClick}>{children}</span>)
}
