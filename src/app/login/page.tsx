"use client";

import Image from "next/image";
import loginBoxTitle from "@/public/loginBoxTitle.svg";
import { Input } from "@/src/components/ui/input";
import { useState } from "react";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export default function Page() {
  const [isPassShow, setPassShow] = useState<boolean>(false);



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
    console.log("isi data adalah : ", data)
    reset({username : "", password : ""})

  }

  
  return (
    <div className="w-full h-screen min-sm flex justify-center items-center bg-white desktop:bg-[#F3F4F6] ">
      <form className="w-100 h-94 bg-white rounded-[1px] desktop:border flex flex-col justify-center items-center gap-4 px-4" onSubmit={handleSubmit(onSubmit)}>
        <Image
          src={loginBoxTitle}
          alt="Login Box Title"
          width={134}
          height={24}
        />
        <div className="flex flex-col w-full  gap-2">
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
        <p className="flex gap-2">
          Dont have any account?{" "}
          <span className="text-blue-600 underline">Register</span>{" "}
        </p>
      </form>
    </div>
  );
}
