
import Image from "next/image";
import loginBoxTitle from "@/public/loginBoxTitle.svg";
import RegisterBox from "@/src/components/RegisterBox";
import Link from "next/link";
import { StoreProvider } from "../StoreProvider";
export default function Page() {
  
  console.log("here server")

  
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white desktop:bg-[#F3F4F6]">
    <div className="w-100 min-h-125 min-sm flex flex-col justify-evenly items-center  bg-white rounded-xl gap-3 ">
         <Image
          src={loginBoxTitle}
          alt="Login Box Title"
          width={134}
          height={24}
        />
        <StoreProvider>
          <RegisterBox />
        </StoreProvider>
        <p className="flex gap-2">
          Dont have any account?{" "}
          <Link className="text-blue-600 underline" href="/login">Login</Link>{" "}
        </p>
    </div>
    </div>
  )
}
