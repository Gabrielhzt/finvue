"use client"

import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo() {
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    return <Image
        src={currentTheme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
        alt="logo"
        width={150}
        height={40}
        style={{
            width: "150px",
            height: "40px",
            objectFit: "cover",
        }}
        priority
    />
}
