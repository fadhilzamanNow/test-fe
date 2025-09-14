import logo from "@/public/logo.svg"
import Image from "next/image"
export default function Footer(){
    return (
        <div className="w-full h-25 bg-[#2563EBDB] flex flex-col md:flex-row justify-center items-center text-white gap-4">
            <Image
            src={logo}
            alt="logo"
            />
            <span>&copy; 2025 Blog genzet. All rights reserved.</span>
        </div>
    )
}