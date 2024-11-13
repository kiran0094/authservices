import React from 'react'

function AuthLayout(
    {children}:
{  children: React.ReactNode}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-r from-[#2c67f2] via-[#62cff4] to-indigo-500">
      {children}   
    </div>

  )
}

export default AuthLayout
