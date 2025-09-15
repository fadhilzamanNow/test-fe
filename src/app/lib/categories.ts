import { AxiosError } from "axios";
import api from "./axios";

interface CategoryType{
    id : string,
    userId : string,
    name : string,
    createdAt : string,
    updatedAt : string
}

interface CategoryResponse {
    data : CategoryType[],
    totalData : number,
    currentPage : number,
    totalPages : number
}

export async function getCategories(currentPage = 1, search = "") : Promise< CategoryResponse | void>  {
    try{
        const response = await api.get(`/categories?page=${currentPage}&search=${search}`)
        return response.data;
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err.message)
        }
    }
}

export type {CategoryType, CategoryResponse}
