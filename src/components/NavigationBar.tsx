"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import logo from "@/public/logo.svg";
import mobileLogo from "@/public/loginBoxTitle.svg";
import { usePathname } from "next/navigation";
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

export default function NavigationBar() {
  const path = usePathname();
  console.log("isi path : ", path)
  return (
    <nav className={`w-full h-16 sm:h-24 flex justify-between items-center px-4 bg-white sm:bg-white/0 ${path !== "/" && 'border-b border-b-slate-200'} sm:px-15`}>
      <Link href="/">
        <Image
          src={path === "/profiles" ? logo : mobileLogo}
          alt="Box Title"
          className="!text-white hidden sm:block"
        />
        <Image
          src={mobileLogo}
          alt="Box Title"
          className="!text-white block sm:hidden"
        />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex gap-2 items-center">
            <Avatar className="flex justify-center items-center size-8 bg-blue-200 text-blue-900">
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            <span
              className={`hidden sm:block ${path === "/profiles" && "underline"}`}
            >
              James Dean
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
                <Link href="/login">
                  <Button className="bg-blue-600 text-white h-10 w-20 hover:bg-blue-600/80">
                    Logout
                  </Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
