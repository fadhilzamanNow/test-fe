import { AxiosError } from "axios";
import api from "./axios";

interface CategoryType {
    id : string,
    name : string,
    userId : string,
    createdAt : string,
    updatedAt : string
}

interface UserType {
    id : string,
    username : string,
    role : string
}

interface ArticlesType {
    id : string,
    title : string,
    content : string,
    userId : string,
    categoryId : string,
    createdAt : string,
    updatedAt : string,
    category : CategoryType,
    user : UserType,
    imageUrl : string,
    categoryName? : string
}

interface ArticleResponse {
    data : ArticlesType[],
    limit : number,
    page : number,
    total : number
}

export async function getArticles() : Promise< ArticleResponse | void>{
    try{
        const response = await api.get("/articles")


        return response.data;
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err.message)
        }
    }
}

export type {ArticlesType, ArticleResponse}