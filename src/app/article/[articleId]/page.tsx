'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { ArticlesType, getArticle } from "../../lib/articles";
import NavigationBar from "@/src/components/NavigationBar";
import ArticleBox from "@/src/components/ArticleBox";
import OtherArticle from "@/src/components/OtherArticle";
import Footer from "@/src/components/Footer";

export default function Page(){
    const params = useParams<{articleId : string}>();
    const [article,setArticle] = useState<ArticlesType>();
    
    async function getNewArticle(){
        if(params?.articleId){
            const response = await getArticle(params.articleId);
            if(response){
                setArticle(response)
            }

        }
    }

    useEffect(() => {
        getNewArticle();
    },[params?.articleId])

    return (
        <div className="min-h-screen w-full flex flex-col gap-8">
            <NavigationBar />
            {
                article && <ArticleBox article={article} />
            }
            <OtherArticle />
            <Footer />
        </div>
    )
}