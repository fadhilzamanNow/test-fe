
import Footer from "@/src/components/Footer";
import NavigationBar from "@/src/components/NavigationBar";
import ProfileComponent from "@/src/components/ProfileComponent";

export default function Page(){


    return (
        <div className="w-full h-screen flex flex-col justify-between">
            <NavigationBar />
            <ProfileComponent  />
        
            <Footer />
        </div>
    )
}