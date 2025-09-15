"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "@/public/logo.svg";
import mobileLogo from "@/public/loginBoxTitle.svg";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { RootState } from "../app/lib/store/store";
import { useDispatch, useSelector } from "react-redux";
import { clearProfile } from "../app/lib/store/profileSlice";
import { useEffect } from "react";

export default function NavigationBar() {
    const router = useRouter()
    const path = usePathname();

    const dispatch = useDispatch();
    const profileInfo = useSelector((state : RootState) => state.profile)
    //const router = useRouter();
    function handleLogout(){
      dispatch(clearProfile())
      localStorage.removeItem("authToken")
      router.push("/login")
    }

    useEffect(() => {
      if(!localStorage.getItem("authToken")){
        router.push("/login")
      }
      
    })

   


  console.log("isi path : ", path)
  return (
    <nav className={`w-full h-16 sm:h-24 flex justify-between items-center px-4 bg-white sm:bg-white/0 ${path !== "/" && 'border-b border-b-slate-200'} sm:px-15`} onClick={() => console.log(profileInfo)}>
      {(path !== "/admin/articles" && path !=="/admin/categories") && 
       <Link href="/">
        <Image
          src={path === "/" ?  logo : mobileLogo}
          alt="Box Title"
          className="!text-white hidden sm:block"
        />
        <Image
          src={mobileLogo}
          alt="Box Title"
          className="!text-white block sm:hidden"
        />
      </Link>
      }
      {
        path === "/admin/articles" &&
        <h1 className="text-xl font-semibold">Articles</h1>
      }
      {
        path === "/admin/categories" &&
        <h1 className="text-xl font-semibold">Category</h1>
      }


     
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-2 items-center">
            <Avatar className="flex justify-center items-center size-8 bg-blue-200 text-blue-900">
              <AvatarFallback>{profileInfo.username?.slice(1,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span
              className={`hidden sm:block ${path === "/profiles" && "underline"}`}
            >
              {profileInfo.username}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href="/profiles">
            <DropdownMenuItem className="w-56 h-11">
              My Account
            </DropdownMenuItem>
          </Link>
          <Dialog>
            <DialogTrigger>
              <DropdownMenuItem
                className="text-red-500 flex items-center gap-2  w-56 h-11 "
                onSelect={(e) => e.preventDefault()}
              >
                <LogOut className="text-red-500" />
                <span className="hover:text-red-500/80">Log out</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="w-100 h-40">
              <DialogHeader>
                <DialogTitle>Logout</DialogTitle>
                <DialogDescription>
                  Are you sure you want to logout?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="h-10 w-20" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                  <Button className="bg-blue-600 text-white h-10 w-20 hover:bg-blue-600/80" onClick={() => handleLogout()}>
                    Logout
                  </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
