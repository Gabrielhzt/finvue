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
  
export function AppSidebar() {

    const items = [
        {
          title: "Overview",
          url: "#",
          icon: Home,
        },
        {
          title: "Transactions",
          url: "#",
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
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
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
  