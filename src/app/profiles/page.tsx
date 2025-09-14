
import Footer from "@/src/components/Footer";
import NavigationBar from "@/src/components/NavigationBar";
import ProfileComponent from "@/src/components/ProfileComponent";
import { StoreProvider } from "../StoreProvider";

export default function Page(){

    console.log("this is server")

    return (
        <div className="w-full h-screen flex flex-col justify-between">
            <StoreProvider>
            <NavigationBar />
            <ProfileComponent  />
            </StoreProvider>
            <Footer />
        </div>
    )
}