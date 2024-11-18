"use client"

import Image from "next/image";
import { SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import Logo from "../logo";

export function SidebarHeaderC() {
    const { state } = useSidebar();

    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    {state === "expanded" ? (
                        <div className="ml-[-10px] mt-1 mb-2">
                            <Logo />
                        </div>
                    ):(
                        <div>
                            <Image
                                src="/logo-icon.png"
                                alt="logo"
                                width={50}
                                height={40}
                                style={{
                                    width: "50px",
                                    height: "33px",
                                    objectFit: "cover",
                                }}
                                priority
                            />
                        </div>
                    )}
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}