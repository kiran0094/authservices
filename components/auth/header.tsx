import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

interface headerLabelProps {
    label: string
}

const HeaderLabel = ({label}:headerLabelProps) => {
  return (
    <div className="flex flex-col w-full gap-3 justify-center items-center">
        <h1 className={cn("text-3xl font-bold  drop-shadow-md",poppins.className)}>
            🔐Auth
        </h1>
        <p className="text-muted-foreground text-sm">
            {label}
        </p>
      
    </div>
  )
}

export default HeaderLabel
