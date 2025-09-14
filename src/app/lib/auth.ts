import { Axios, AxiosError } from "axios";
import api from "./axios";

type Role = "User" | "Admin"


export async function postLogin(username : string, password : string){
    try{
        const response = await api.post("/auth/login", {
            username : username,
            password : password
        });
        return response.data;
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err.message)
        }
    }
}

export async function postRegister(username : string, password : string, role : Role ){
    console.log("run register")
    try{
        const response = await api.post("/auth/register", {
            username : username,
            password : password,
            role : role
        } )

        return response.data
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err)
        }
    }
}

export async function getProfile(){
    try{
        const response = await api.get(`/auth/profile`)
        return response.data
    }catch(err){
        if(err instanceof AxiosError){
            console.log(err.message)
        }
    }
}

export type {Role}