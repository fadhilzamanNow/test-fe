'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "../app/lib/store/store"

export default function ProfileComponent(){

    const profileInfo = useSelector((state : RootState) => state.profile)

        const userInfo = {
        Username : profileInfo.username,
        Password : "*********",
        Role : profileInfo.role
    }
    return (
        <div className="h-full w-full flex flex-col justify-center items-center gap-8 border">
            <h1 className="text-xl font-semibold">User Profile</h1>
            <Avatar className="size-17 sm:size-20 ">
                <AvatarFallback className="bg-blue-200 text-blue-900 text-2xl sm:text-3xl font-medium">J</AvatarFallback>
            </Avatar>

      {Object.entries(userInfo).map(([key, value]) => (
        <div 
          key={key} 
          className="
           w-70 sm:w-90 h-10 sm:h-11 border border-slate-200 bg-gray-50 rounded-lg
            grid grid-cols-[100px_auto_1fr] items-center px-4  
          "
        >
          <span className="font-semibold text-base capitalize">{key}</span>
          <span>:</span>
          <span className="place-self-center">{value}</span>
        </div>
      ))}
        <Link href="/">
        <Button className="bg-blue-600 text-white w-70 h-10 sm:w-90 sm:h-11 hover:bg-blue-600/80">Back to home</Button>        
        </Link>
        </div>
    )
}