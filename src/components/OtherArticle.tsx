'use client'
import { useEffect, useMemo, useState } from "react"
import { ArticleResponse, ArticlesType, getArticles } from "../app/lib/articles"
import { CategoryType, getCategories } from "../app/lib/categories"
import Link from "next/link"
import ArticleCard from "./ArticleCard"
import { LoaderCircle } from "lucide-react"

export default function OtherArticle(){
      const [articles, setArticles] = useState<ArticlesType[]>()
      const [categories, setCategories] = useState<CategoryType[]>()
      


      async function getAllArticlesCategories(){
          try{
            const articlesData = await getArticles();
            const categoriesData = await getCategories();
      
      
            if(articlesData && categoriesData){
      
            const filterArticles = articlesData.data.map((a) => {
              const categoryData = categoriesData.data.find((c) => c.id === a.categoryId)
              return {
                ...a,
                ...(categoryData && {categoryName : categoryData.name})
              }
            })
      
            setArticles(filterArticles)
            setCategories(categoriesData.data)

            console.log("isi articles : ", filterArticles)
           
      
            }
          }catch(err){
            console.log("There is error : ", err)
          }
          
        }

        useEffect(() => {
            getAllArticlesCategories()
        },[])

    
    return (
        <div className="w-full px-5 sm:px-10 lg:px-50 ">
            <h2 className="text-slate-900 text-xl font-bold mb-10">Other Articles</h2>
            <div className="h-full w-full grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-4">
            {articles && articles.slice(1,4).map((article)=> (
              <Link key={article.id} href={`/article/${article.id}`} >
              <ArticleCard key={article.id}  test="123" article={article} />
              </Link>
            ))}
        </div>
        </div>
    )
}