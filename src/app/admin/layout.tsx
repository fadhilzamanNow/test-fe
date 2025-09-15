'use client'

import AdminSidebar from "@/src/components/AdminSidebar";
import NavigationBar from "@/src/components/NavigationBar";
import { StoreProvider } from "../StoreProvider";










export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   
  return (
    <div className="min-h-screen w-full flex">
            <div>
            <AdminSidebar />
            </div>
            
            <div className="w-full flex flex-col " >
              <StoreProvider>
                <NavigationBar  />
              </StoreProvider>
                <div className="h-full w-full flex justify-center items-center bg-slate-100 py-4">
                    {children}
                </div>
            </div>
            
        </div>
 
  );
}
