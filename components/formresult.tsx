import { Errortriangle, Successcircle } from "@/lib/icons";
interface FormErrorProps {
    errormessage?: string;
}
interface FormSuccessProps {
    successmessage?: string;
}
export const FormError = ({ errormessage }: FormErrorProps) => {
    if(!errormessage) return null
    
    return (
        <div className="bg-destructive/15  p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
           <Errortriangle  />
           <p>{errormessage}</p>
        </div>
        
    );
};

export const Formsuccess = ({ successmessage }: FormSuccessProps) => {
    if(!successmessage) return null
    
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 ">
           <Successcircle/>
           <p>{successmessage}</p>
        </div>
        
    );
};