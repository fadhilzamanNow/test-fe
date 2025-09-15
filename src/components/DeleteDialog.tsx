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
import { Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface DeleteProps {
    children : React.ReactNode,
    handleDelete : (articleId : string) => void,
    articleId : string
}

export default function DeleteDialogue({children, handleDelete, articleId} : DeleteProps){
    const path = usePathname()
    const [open,setOpen] = useState<boolean>(false);
    return (
<Dialog open={open}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                {children}
            </DialogTrigger>
            <DialogContent className="w-100 h-40">
              <DialogHeader>
                <DialogTitle>Delete {path === "/admin/articles" ? "Articles" : "Category"}</DialogTitle>
                <DialogDescription>
                  Deleting this {path === "/admin/articles" ? "Articles" : "Category"} is permanent and cannot be undone. All related content will be removed.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="h-10 w-20" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </DialogClose>
                  <Button className="bg-red-500 text-white h-10 w-20 hover:bg-red-500/80" onClick={() => {
                    setOpen(false)
                    handleDelete(articleId)
                  }}>
                    Delete
                  </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
    )
}