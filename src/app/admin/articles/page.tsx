'use client'

import { useEffect, useState } from "react";
import { ArticleResponse, ArticlesType, getArticles } from "../../lib/articles";
import { CategoryType, getCategories } from "../../lib/categories";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { Bolt, Play, Search, Trash } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PagePagination from "@/src/components/PagePagination";
import AdminListArticles from "@/src/components/AdminListArticles";
import AdminCreateArticles from "@/src/components/AdminCreateArticles";

export type ListMode = "LIST" | "CREATE" | "EDIT"

export default function Page(){
    const [isList,setIsList] = useState<ListMode>("LIST");

    function handleChangeMode(mode : ListMode){
      setIsList(mode)
    }

    
    return (
      <div className="h-full w-full mx-10">
        {isList === "LIST" && <AdminListArticles handleChangeMode={handleChangeMode} />}
        {isList === "CREATE" && <AdminCreateArticles handleChangeMode={handleChangeMode} />}
      </div>
    
    )

}