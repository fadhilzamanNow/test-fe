'use client'


import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, Newspaper, Tag } from "lucide-react";
import logo from "@/public/logo.svg"
import Image from "next/image";
import Link from "next/link";

export default function AdminSidebar(){
     const items = [
  {
    title: "Articles",
    url: "/admin/articles",
    icon: Newspaper,
  },
  {
    title: "Category",
    url: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Logout",
    url: "/login",
    icon: LogOut,
  }
]

    return (
    <SidebarProvider>
    <Sidebar className="!bg-blue-600  ">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image 
                src={logo}
                alt="logo"
            />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-5">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="hover:!bg-blue-600/80">
                  <SidebarMenuButton asChild className="hover:!bg-blue-400/40">
                    <Link href={item.url}>
                      <item.icon className="!text-white" />
                      <span className="!text-white hover:!bg-blue-500">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
</SidebarProvider>
    )
}