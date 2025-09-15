'use client'


import { ArrowLeft, ImageUp} from "lucide-react";

import { ListMode } from "../app/admin/articles/page";
import z from "zod";
import {  useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectGroup, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryType, getCategories } from "../app/lib/categories";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import RichTextEditor from "./RichTextEditor";

const formSchema = z.object({
  thumbnail: z
    .instanceof(File, { message: 'Please enter a picture' })
    .refine(
      (file) => ['image/jpeg', 'image/png'].includes(file.type),
      'Only .jpg and .png formats are supported.'
    ),
});

interface AdminCreateArticlesProps {
    handleChangeMode : (mode : ListMode) => void
}

export default function AdminCreateArticles({handleChangeMode} : AdminCreateArticlesProps){
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [chooseCategory, setChooseCategory] = useState<string>("");


    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

   const handleDelete = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

   async function getAllCategories(){
        const categoriesData = await getCategories();
        if(categoriesData){
              const filterCategories = categoriesData.data.map((c) => {
                    if(c.id === ""){
                    return {
                        ...c,
                        id : "-"
                    }
                    } 
                    return {
                    ...c
                    }
                })
                setCategories(filterCategories)
                }
   }

   useEffect(() => {
    getAllCategories()
   },[])

   const handleChangeClick = () => {
    console.log("udah mounted")
    fileInputRef.current?.click();
};



    return (
        <div className="w-full h-full  bg-white  border border-gray-50 rounded-xl flex flex-col">
            <span className="w-full h-18 flex items-center border-b boder-b-gray-50 pl-5 font-medium" onClick={() => handleChangeMode('LIST')}><ArrowLeft /> Create Articles</span>
            <div className="w-full min-h-[1162px] p-5 flex flex-col  gap-5">
              <h1>Thumbnails</h1>
              <div className="border border-dashed w-55 h-40 flex flex-col gap-3 text-xs !text-slate-500 justify-center items-center border-slate-300 rounded-lg relative">
                <ImageUp />
                <span className="underline">Click to select files</span>
                <span className="text-center">Support File Type : jpg or png</span>
                {preview && file  ? (
                      <div className="border rounded-lg p-4 space-y-4 bg-white">
          <div className="absolute w-full z-22 inset-0 bg-white px-2 pt-2 pb-6">
            <div className="relative w-full h-full p-10">
              <Image
              src={preview}
              alt={file.name}
              fill
              className="object-cover rounded-md size-2"
            />
            </div>
    
              <div className="flex justify-center items-center gap-4 mt-1  ">
            <span
              className="text-blue-600 hover:text-blue-600/60 underline"
              onClick={handleChangeClick}
            >
              Changes
            </span>
            <span
              className="text-red-500 hover:text-red-500/60 p-0 h-auto underline"
              onClick={handleDelete}
            >
              Delete
            </span>
              </div>
          </div>
        
        </div>
                ) :                <Input type="file" className="w-full h-full inset-0 opacity-0 absolute" ref={fileInputRef} accept="image/png,image/jpeg" onChange={handleFileChange}/>
}
              </div>
              <h1 className="font-semibold">Title</h1>
              <Input type="text" placeholder="Input Title" className="w-full h-10"  />
              <h1 className="font-semibold">Category</h1>
               <Select onValueChange={(catId) => {
              setChooseCategory(catId) 
             
            }}   defaultValue="" >
              <SelectTrigger className="w-full  bg-red">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
                <RichTextEditor />
                <div className="h-18 w-full flex justify-end items-center gap-4 ">
                  <Button className="bg-white hover:bg-white/80 !text-black border border-bg-slate-200">Cancel</Button>
                  <Button className="bg-slate-200 hover:bg-slate-200/80 !text-black">Preview</Button>
                  <Button className="bg-blue-500 hover:bg-blue-500/80 !text-white">Cancel</Button>


                </div>
            </div>
                  

        </div>
    )
}