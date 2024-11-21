"use server"

import { auth } from "@/auth"
import { db } from "@/drizzle/db"
import { categories, recurringTransactions, transactions } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const createTransaction = async (formData: FormData) => {

    const { amount, type, description, date } = Object.fromEntries(formData.entries());

    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return { error: "Unauthorized" }

    await db.insert(transactions).values({ 
        amount: String(amount),
        type: type as "income" | "expense",
        description: String(description),
        date: new Date(date as string),
        userId 
    })
    revalidatePath("/transactions")

    return { success: "Transaction created successfully" }
}

export const deleteTransaction = async (id: string) => {
    await db.delete(transactions).where(eq(transactions.id, id))
    revalidatePath("/transactions")
}

export const createRecurringTransaction = async (formData: FormData) => {
    const { amount, type, description, startDate, endDate, frequency } = Object.fromEntries(formData.entries());

    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return { error: "Unauthorized" }

    await db.insert(recurringTransactions).values({
        amount: String(amount),
        type: type as "income" | "expense",
        description: String(description),
        startDate: new Date(startDate as string),
        endDate: endDate ? new Date(endDate as string) : null,
        frequency: frequency as "daily" | "weekly" | "monthly" | "yearly",
        userId 
    })
    revalidatePath("/transactions")

    return { success: "Recurring transaction created successfully" }
}