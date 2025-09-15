'use client'

import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/src/components/ui/input";
import { Bolt, Play, Search, Trash } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PagePagination from "@/src/components/PagePagination";
import { CategoryType, getCategories } from "../app/lib/categories";
import { ArticleResponse, ArticlesType, deleteArticle, getArticles } from "../app/lib/articles";
import { ListMode } from "../app/admin/articles/page";
import DeleteDialogue from "./DeleteDialog";

interface AdminListArticlesProps {
    handleChangeMode : (mode : ListMode) => void
}

export default function AdminListArticles({handleChangeMode} : AdminListArticlesProps){

    const [searchVal, setSearchVal] = useState<string>("");
    const [articles, setArticles] = useState<ArticlesType[]>([])
    const [currentPage, setCurrentPage] = useState<ArticleResponse['page']>(1);
    const [totalItem, setTotalItem] = useState<ArticleResponse['total']>(1);
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [chooseCategory, setChooseCategory] = useState<string>("");
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    async function getAllArticlesCategories(){
        try{
          const articlesData = await getArticles(searchVal,currentPage, chooseCategory);
          const categoriesData = await getCategories();
    
    
          if(articlesData && categoriesData){
    
          const filterArticles = articlesData.data.map((a) => {
            const categoryData = categoriesData.data.find((c) => c.id === a.categoryId)
            return {
              ...a,
              ...(categoryData && {categoryName : categoryData.name})
            }
          })
    
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
    
          setArticles(filterArticles)
          setCurrentPage(articlesData.page)
          setTotalItem(articlesData.total)
          setCategories(filterCategories)
    
    
          
    
          }


        }catch(err){
          console.log("There is error : ", err)
        }
      }

      const handleDeletes = async (articleId : string) => {
        await deleteArticle(articleId);
        setIsDeleting(true)
        //await deleteArticle(userId);

      }


      useEffect(() => {
          getAllArticlesCategories();
          console.log("isi search val : ", chooseCategory)

          if(isDeleting){
            setIsDeleting(false)
          }
        },[searchVal, currentPage, chooseCategory, isDeleting])
      
        function debounce(cb : (cb : string) => void){
          let timeoutId : ReturnType<typeof setTimeout>;
          return function(data : string){
            clearTimeout(timeoutId);
      
            timeoutId = setTimeout(() => {
              cb(data)
              setCurrentPage(1)
            }, 500)
            
          }
        }
      
        async function logInput(data : string){
          setSearchVal(data)
        }
      
        const debounceInput = debounce(logInput)
      
        const handleChange = (e : React.FormEvent<HTMLInputElement>) => {
          debounceInput((e.target as HTMLInputElement).value);
        }
      
        const handleCurrentPage = (a : number) => {
          setCurrentPage(a)
        }
      
        const rowTitle = ["Thumbnails", "Title", "Category", "Created at", "Action"]

    return (
        <div className="w-full h-full  bg-white  border border-gray-50 rounded-xl flex flex-col">
            <span className="w-full h-18 flex items-center border-b boder-b-gray-50 pl-5 font-medium">Total Articles : {totalItem}</span>
            <div className="w-full h-22 flex items-center p-5 justify-between">
              <div className="flex gap-4">
              <Select onValueChange={(catId) => {
              setChooseCategory(catId) 
              setCurrentPage(1)
            }}   defaultValue="" >
              <SelectTrigger className="w-full sm:w-45 bg-white">
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
                        <div className="w-full sm:w-60 h-10 relative text-slate-400">

                        <Input placeholder="Search Articles" className="w-full h-full bg-white pl-9 text-sm" onChange={(e) => handleChange(e)} />
                         <div className="absolute top-1/2 -translate-y-1/2 left-3">
            <Search size={16} />
            
            </div>
           
                  </div>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-600/80 text-white" onClick={() => handleChangeMode("CREATE")}>+ Add Articles</Button>
            </div>
            <Table className="px-5 h-full">
  <TableHeader>
    <TableRow>
      {rowTitle.map((v,i) => (
        <TableHead key={i+1} className={`text-center w-57 bg-slate-100`}>{v}</TableHead>
      ))}

    </TableRow>
  </TableHeader>
  <TableBody>
      {articles.map((v,i) => (
        <TableRow key={v.id}>
          <TableCell className="flex justify-center items-center  ">
            <img
              src={v.imageUrl}
              className="size-17.5 object-cover text-center rounded-md"
            />
          </TableCell>
          <TableCell className="text-center text-wrap">{v.title}</TableCell>
          <TableCell className="text-center ">{v.categoryName}</TableCell>
          <TableCell className="text-center">{v.createdAt}</TableCell>
          <TableCell className="align-middle ">
            <div className="flex justify-center items-center gap-2">
                <Button className="bg-blue-500 hover:bg-blue-500/80"><Play className="text-white"  /></Button>
                <Button className="bg-yellow-400 hover:bg-yellow-400/80"><Bolt className="text-white" /></Button>
                <DeleteDialogue handleDelete={handleDeletes} articleId={v.id} >
                <Button className="bg-red-500 hover:bg-red-500/80"><Trash className="text-white" /></Button>
                </DeleteDialogue>
            </div>
          </TableCell>
        </TableRow>
      ))}
  </TableBody>
</Table>
        <div className="mt-10">
        <PagePagination totalItem={totalItem} currentPage={currentPage} handleCurrentPage={handleCurrentPage}/>
        </div>

        </div>
    )
}