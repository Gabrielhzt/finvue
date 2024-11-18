"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Sparkles } from "lucide-react";

export function SidebarSubCard() {
    const { state } = useSidebar();

    return (
        state === "expanded" ? (
            <Card className="shadow-none p-0.5 mb-2">
                <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-sm">Upgrade to Pro</CardTitle>
                    <CardDescription>
                        Get access to premium features and unlock the full potential of our platform.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2.5 p-4">
                    <Button
                        className="w-full bg-sidebar-primary text-sidebar-primary-foreground shadow-none hover:bg-sidebar-primary/70"
                        size="sm"
                        asChild
                    >
                        <a href="#">View Plans</a>
                    </Button>
                </CardContent>
            </Card>
        ) : (
            <SidebarMenuItem className="list-none mb-2">
                <SidebarMenuButton asChild tooltip="Subscriptions">
                    <a href={"#"}>
                        <Sparkles />
                        <span>Subscriptions</span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    )
}
