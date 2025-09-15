'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface AddProps {
    children : React.ReactNode,
    handleAdd : () => void,
}

export default function AddDialogue({children, handleAdd} : AddProps){
    const [open,setOpen] = useState<boolean>(false);
    return (
<Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                {children}
            </DialogTrigger>
            <DialogContent className="w-100 h-52">
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
                <DialogDescription>
                </DialogDescription>
              </DialogHeader>
               <h1>Add Category</h1>
                    <Input placeholder="Input Category" />
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="h-10 w-20" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </DialogClose>
                  <Button className="bg-blue-600 text-white h-10 w-20 hover:bg-blue-500/80" onClick={() => {
                    setOpen(false)
                    handleAdd()
                  }}>
                    Add
                  </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
    )
}