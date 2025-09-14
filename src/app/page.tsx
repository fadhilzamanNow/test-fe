'use client'

import Image from "next/image";
import hero from "@/public/heroUser.jpg"
import logo from "@/public/logo.svg"
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "../components/ui/input";
import { LoaderCircle, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ArticleResponse, ArticlesType, getArticles } from "./lib/articles";
import ArticleCard from "../components/ArticleCard";
import { CategoryType, getCategories } from "./lib/categories";
import PagePagination from "../components/PagePagination";
import Footer from "../components/Footer";
import mobileLogo from "@/public/loginBoxTitle.svg"
import NavigationBar from "../components/NavigationBar";
import Link from "next/link";
import { StoreProvider } from "./StoreProvider";

export default function Page() {
  const [searchVal, setSearchVal] = useState<string>("");
  const [articles, setArticles] = useState<ArticlesType[]>([])
  const [currentPage, setCurrentPage] = useState<ArticleResponse['page']>(1);
  const [totalItem, setTotalItem] = useState<ArticleResponse['total']>(1);
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [chooseCategory, setChooseCategory] = useState<string>("");


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

  

  useEffect(() => {
    getAllArticlesCategories();
    console.log("isi search val : ", chooseCategory)
  },[searchVal, currentPage, chooseCategory])

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

  



  return (
    <div className="min-h-screen flex flex-col gap-8">
      <div className="w-full h-125 relative">
        <Image 
        src={hero}
        alt="Hero"
        className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-[#2563EBDB]/86">
        <div className="relative w-full h-full text-white">
        <StoreProvider>
          <NavigationBar/>
        </StoreProvider>
        <div className="w-full h-101 flex flex-col justify-center items-center gap-3 overflow-y-hidden">
          <span className="font-bold text-sm sm:text-base">Blog Genzet</span>
          <h1 className="font-bold text-center text-4xl sm:text-5xl" >The Journal :  Design Resouces,</h1>
          <h1 className="font-bold text-center text-4xl sm:text-5xl">Interviews, and Industry News</h1>
          <h3 className="text-xl text-center sm:text-2xl">Your daily dose of design insights!</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-7 bg-blue-500 rounded-xl mx-4 p-2 text-black">
            
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
            <div className="w-full sm:w-100 h-10 relative text-slate-400">
            <Input placeholder="Search Articles" className="w-full h-full bg-white pl-9 text-sm" onChange={(e) => handleChange(e)} />
            <div>

            </div  >
            <div className="absolute top-1/2 -translate-y-1/2 left-3">
            <Search size={16} />
            
            </div>
           
            </div>
          </div>
        </div>


        
        </div>
        </div>
      </div>
      <div className="h-full w-full bg-white px-20 py-10.5 ">
        <span className="text-base">Showing: 20 of 240 entries</span>
        <div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(386px,1fr))] gap-4 ">
        {articles.map((article)=> (
          <Link key={article.id} href={`/article/${article.id}`}>
          <ArticleCard key={article.id}  test="123" article={article} />
          </Link>
        ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center">
        <PagePagination totalItem={totalItem} currentPage={currentPage} handleCurrentPage={handleCurrentPage}/>
      </div>
      <Footer />
    </div>
  );
}
