import { BarChart, Home, ReceiptText, Settings, ArrowUpDown } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarGroupContent,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { SidebarSubCard } from "./sidebar-sub-card"
import { SidebarHeaderC } from "./sidebar-header"
import Link from "next/link"
  
export function AppSidebar() {

    const items = [
        {
          title: "Overview",
          url: "/dashboard",
          icon: Home,
        },
        {
          title: "Transactions",
          url: "/transactions",
          icon: ArrowUpDown,
        },
        {
          title: "Budget Management",
          url: "#",
          icon: ReceiptText,
        },
        {
          title: "Reports and Analytics",
          url: "#",
          icon: BarChart,
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings,
        },
    ]

    return (
        <Sidebar collapsible="icon">
            <SidebarHeaderC />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarSubCard />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <NavUser />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
  