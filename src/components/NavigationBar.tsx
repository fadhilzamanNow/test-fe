'use client'
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "@/public/logo.svg"
import mobileLogo from "@/public/loginBoxTitle.svg"
import { usePathname } from "next/navigation";
import Link from "next/link";


export default function NavigationBar(){

    const path = usePathname()
    console.log('isi path :', path)
    return (
         <nav className="w-full h-16 sm:h-24 flex justify-between items-center px-4 bg-white sm:bg-white/0">
        <Link href="/">
          <Image 
          src={path !== "/profiles" ? logo : mobileLogo }
          alt="Box Title"
          className="!text-white hidden sm:block"
          />
          <Image 
          src={mobileLogo}
          alt="Box Title"
          className="!text-white block sm:hidden"
          />
          </Link>
          <div className="flex gap-2 items-center">
          <Avatar className="flex justify-center items-center size-8 bg-blue-200 text-blue-900" >
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <span className={`hidden sm:block ${path === "/profiles" && 'underline'}`}>James Dean</span>
          </div>
        </nav>
    )
}