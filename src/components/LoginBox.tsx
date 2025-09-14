"use client";

import Image from "next/image";
import loginBoxTitle from "@/public/loginBoxTitle.svg";
import { Input } from "@/src/components/ui/input";
import { useEffect, useState } from "react";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { validateTokenHandler } from "@/src/lib/validateToken";
import { getProfile, postLogin } from "../app/lib/auth";
import { setProfile } from "../app/lib/store/profileSlice";
import { RootState } from "../app/lib/store/store";
import { useRouter } from "next/navigation";
export default function LoginBox() {
  const [isPassShow, setPassShow] = useState<boolean>(false);
  const dispatch = useDispatch()
  const profileInfo = useSelector((state : RootState) => state.profile)
  const router = useRouter()

  useEffect(() => {
    if(localStorage.getItem("authToken")){
      router.push("/")
    }
  },[])

  const toggleShow = () => {
    setPassShow((show) => !show);
  };


  const loginSchema = z.object({
    username: z.string().min(1, { message: "Please enter your username" }),
    password: z.string().min(1, { message: "Please enter your password" }),
  });
  
  const { register, handleSubmit, formState: { errors }, reset} = useForm({
        resolver: zodResolver(loginSchema),
      });

  const onSubmit : SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {

    const response = await postLogin(data.username,data.password)
    if(response){
      localStorage.setItem("authToken", response.token)
      const token = validateTokenHandler(response.token)
      if(token){
        const profileInfo = await getProfile()
        console.log("isi profileinfo : ", profileInfo);
        dispatch(setProfile(profileInfo))
        router.push("/")

      }
    }
    reset({username : "", password : ""})
    
    

  }

  
  return (
      <form className="w-full h-full bg-white rounded-[1px]  flex flex-col justify-center items-center gap-4 px-4" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="flex flex-col w-full  gap-2" onClick={() => console.log(profileInfo)}>
          <Label htmlFor="user" className="px-1">
            Username
          </Label>
          <Input
            {...register("username")}
            type="text"
            id="user"
            placeholder="Input Username"
            className="h-10"
            {...register("username", {
              required: true,
              onChange: (e) => console.log(e.target.value),
            })}
          />
          {errors.username?.message && <span className="text-red-500">{errors.username.message}</span>} 
        </div>
        <div className="flex flex-col w-full   gap-2">
          <Label htmlFor="password" className="px-1">
            Password
          </Label>
          <div className="relative">
            <Input
              {...register("password")}
              type={isPassShow ? "text" : "password"}
              id="password"
              placeholder="Input Password"
              className="h-10"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-4 text-[#475569]/50"
              onClick={toggleShow}
            >
              {isPassShow ? <EyeOff /> : <Eye />}
            </div>
          </div>
            {errors.password?.message && <span className="text-red-500">{errors.password.message}</span>} 

        </div>
        <Button
          variant="secondary"
          className="w-full bg-blue-600 text-white h-10 hover:bg-blue-600/70"
        >
          Login
        </Button>
      </form>
  );
}
