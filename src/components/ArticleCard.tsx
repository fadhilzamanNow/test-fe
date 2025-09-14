'use client'

import Image from "next/image";
import cardImage from "@/public/heroUser.jpg"
import { ArticlesType } from "../app/lib/articles";
import { BookImage } from "lucide-react";
import { parseISO, format } from 'date-fns';

type ArticleCardProps = {
  article?: ArticlesType;
  test? : string
};


export default function ArticleCard( {test, article} : ArticleCardProps ){

    console.log("isi article disini:", article )

    const formatDate = format(parseISO(article?.updatedAt as string),"MMMM d, yyyy");

    console.log("isi format date", formatDate)

   
    return (
        <div className="sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl  flex flex-col gap-3 h-full">
        {article && article.imageUrl ?   
            <img
            src={article?.imageUrl}
            alt="Pic"
            className="rounded-xl object size-full object-cover h-60"
          />: 
          <div className="size-full bg-slate-400 rounded-xl ! text-white flex justify-center items-center h-60" >
           <BookImage className="size-8    md:size-12
          lg:size-16
          xl:size-20 "
          />
          </div>} 
         <span className="text-slate-600 text-sm">{formatDate}</span>
         <h2 className="text-slate-900 text-lg font-semibold">{article?.title}</h2>
         <p className="text-base text-slate-600 line-clamp-2 leading-normal min-h-12" >{article?.content}</p>
         <span className="bg-blue-200 text-blue-900 py-1 px-3 text-sm rounded-[100px] flex justify-center items-center max-w-max ">{article?.categoryName}</span>

        </div>
    )
}