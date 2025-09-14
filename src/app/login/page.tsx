
import Image from "next/image";
import loginBoxTitle from "@/public/loginBoxTitle.svg";
import LoginBox from "@/src/components/LoginBox";
import { StoreProvider } from "../StoreProvider";
import Link from "next/link";
export default function Page() {
 
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white desktop:bg-[#F3F4F6]">
    <div className="w-100 min-h-94 min-sm flex flex-col justify-evenly items-center  bg-white rounded-xl gap-3 ">
         <Image
          src={loginBoxTitle}
          alt="Login Box Title"
          width={134}
          height={24}
        />
        <StoreProvider>
          <LoginBox />
        </StoreProvider>
        <p className="flex gap-2">
          Dont have any account?{" "}
          <Link className="text-blue-600 underline" href="/register">Register</Link>{" "}
        </p>
    </div>
    </div>
  );
}
