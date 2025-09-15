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
import { useState } from "react";

interface DeleteProps {
    children : React.ReactNode,
    handleEdit : (articleId : string) => void,
    articleId : string
}

export default function EditDialogue({children, handleEdit, articleId} : DeleteProps){
    const [open,setOpen] = useState<boolean>(false);
    return (
    <Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                {children}
            </DialogTrigger>
            <DialogContent className="w-100 h-50">
              <DialogHeader>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogDescription>
                  
                </DialogDescription>
                  <h1>Category</h1>
                    <Input placeholder={articleId} />
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="h-10 w-20" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </DialogClose>
                  <Button className="bg-blue-600 text-white h-10 max-w-max hover:bg-blue-500/80 " onClick={() => {
                    setOpen(false)
                  }}>
                    Save Changes
                  </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
    )
}