import { auth } from "@/auth"
import { db } from "@/drizzle/db"
import { recurringTransactions, transactions } from "@/drizzle/schema"
import { and, desc, eq, sql } from "drizzle-orm"

export const getTotalIncome = async () => {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return { value: "0", percentage: "+0.0%" }

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    
    const currentMonthResult = await db.select({
        total: sql<number>`sum(amount)`
    })
    .from(transactions)
    .where(
        and(
            eq(transactions.type, "income"),
            eq(transactions.userId, userId),
            sql`EXTRACT(MONTH FROM date) = ${currentMonth + 1}`,
            sql`EXTRACT(YEAR FROM date) = ${currentYear}`
        )
    )

    const lastMonth = currentMonth === 0 ? 12 : currentMonth
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
    
    const previousMonthResult = await db.select({
        total: sql<number>`sum(amount)`
    })
    .from(transactions)
    .where(
        and(
            eq(transactions.type, "income"),
            eq(transactions.userId, userId),
            sql`EXTRACT(MONTH FROM date) = ${lastMonth}`,
            sql`EXTRACT(YEAR FROM date) = ${lastMonthYear}`
        )
    )

    const currentMonthTotal = Number(currentMonthResult[0].total) || 0
    const previousMonthTotal = Number(previousMonthResult[0].total) || 0

    let percentageChange = 0
    if (previousMonthTotal !== 0) {
        percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
    } else if (currentMonthTotal > 0) {
        percentageChange = 100
    }

    const percentageString = `${percentageChange >= 0 ? '+' : '-'}${Math.abs(percentageChange).toFixed(1)}%`

    return {
        value: currentMonthTotal.toFixed(2),
        percentage: percentageString
    }
}

export const getTotalExpenses = async () => {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return { value: "0", percentage: "+0.0%" }

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    
    const currentMonthResult = await db.select({
        total: sql<number>`sum(amount)`
    })
    .from(transactions)
    .where(
        and(
            eq(transactions.type, "expense"),
            eq(transactions.userId, userId),
            sql`EXTRACT(MONTH FROM date) = ${currentMonth + 1}`,
            sql`EXTRACT(YEAR FROM date) = ${currentYear}`
        )
    )

    const lastMonth = currentMonth === 0 ? 12 : currentMonth
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
    
    const previousMonthResult = await db.select({
        total: sql<number>`sum(amount)`
    })
    .from(transactions)
    .where(
        and(
            eq(transactions.type, "expense"),
            eq(transactions.userId, userId),
            sql`EXTRACT(MONTH FROM date) = ${lastMonth}`,
            sql`EXTRACT(YEAR FROM date) = ${lastMonthYear}`
        )
    )

    const currentMonthTotal = Number(currentMonthResult[0].total) || 0
    const previousMonthTotal = Number(previousMonthResult[0].total) || 0

    let percentageChange = 0
    if (previousMonthTotal !== 0) {
        percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
    } else if (currentMonthTotal > 0) {
        percentageChange = 100
    }

    const percentageString = `${percentageChange >= 0 ? '+' : '-'}${Math.abs(percentageChange).toFixed(1)}%`

    return {
        value: currentMonthTotal.toFixed(2),
        percentage: percentageString
    }
}

export const getTotalRecurringTransactions = async () => {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return { value: "0", percentage: "+0.0%" }

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    
    const currentMonthResult = await db.select({
        total: sql<number>`COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0)`
    })
    .from(recurringTransactions)
    .where(
        and(
            eq(recurringTransactions.userId, userId),
            sql`start_date <= CURRENT_DATE`,
            sql`(end_date IS NULL OR end_date >= CURRENT_DATE)`
        )
    )

    const lastMonth = currentMonth === 0 ? 12 : currentMonth
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const previousMonthDate = new Date(lastMonthYear, lastMonth - 1, 1)
    
    const previousMonthResult = await db.select({
        total: sql<number>`COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0)`
    })
    .from(recurringTransactions)
    .where(
        and(
            eq(recurringTransactions.userId, userId),
            sql`start_date <= ${previousMonthDate}`,
            sql`(end_date IS NULL OR end_date >= ${previousMonthDate})`
        )
    )

    const currentMonthTotal = Number(currentMonthResult[0].total) || 0
    const previousMonthTotal = Number(previousMonthResult[0].total) || 0

    let percentageChange = 0
    if (previousMonthTotal !== 0) {
        percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
    } else if (currentMonthTotal !== 0) {
        percentageChange = currentMonthTotal > 0 ? 100 : -100
    }

    const percentageString = `${percentageChange >= 0 ? '+' : '-'}${Math.abs(percentageChange).toFixed(1)}%`

    return {
        value: currentMonthTotal.toFixed(2),
        percentage: percentageString
    }
}

export const getTotalBalance = async () => {
    const currentIncome = await getTotalIncome()
    const currentExpenses = await getTotalExpenses()
    const currentRecurring = await getTotalRecurringTransactions()
    const currentTotal = Number(currentIncome.value) - Number(currentExpenses.value) + Number(currentRecurring.value)

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const lastMonth = currentMonth === 0 ? 12 : currentMonth
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

    const previousMonthDate = new Date(lastMonthYear, lastMonth - 1, 1)
    const previousTotal = await calculateTotalForMonth(previousMonthDate)

    let percentageChange = 0
    if (previousTotal !== 0) {
        percentageChange = ((currentTotal - previousTotal) / Math.abs(previousTotal)) * 100
    } else if (currentTotal !== 0) {
        percentageChange = 100
    }

    const percentageString = `${percentageChange >= 0 ? '+' : '-'}${Math.abs(percentageChange).toFixed(1)}%`

    return {
        value: currentTotal.toFixed(2),
        percentage: percentageString
    }
}

async function calculateTotalForMonth(date: Date) {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return 0

    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const transactionsResult = await db.select({
        income: sql<number>`COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0)`,
        expenses: sql<number>`COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0)`
    })
    .from(transactions)
    .where(
        and(
            eq(transactions.userId, userId),
            sql`EXTRACT(MONTH FROM date) = ${month}`,
            sql`EXTRACT(YEAR FROM date) = ${year}`
        )
    )

    const recurringResult = await db.select({
        total: sql<number>`COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE -amount END), 0)`
    })
    .from(recurringTransactions)
    .where(
        and(
            eq(recurringTransactions.userId, userId),
            sql`start_date <= ${date}`,
            sql`(end_date IS NULL OR end_date >= ${date})`
        )
    )

    const income = Number(transactionsResult[0].income) || 0
    const expenses = Number(transactionsResult[0].expenses) || 0
    const recurring = Number(recurringResult[0].total) || 0

    return income - expenses + recurring
}

export const getMonthlyTransactions = async () => {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return []

    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11)

    const transactionsResult = await db.select({
      month: sql<string>`TO_CHAR(date, 'YYYY-MM')`,
      income: sql<number>`SUM(CASE WHEN type = 'income' THEN CAST(amount AS NUMERIC) ELSE 0 END)`,
      expenses: sql<number>`SUM(CASE WHEN type = 'expense' THEN CAST(amount AS NUMERIC) ELSE 0 END)`
    })
    .from(transactions)
    .where(
      and(
        eq(transactions.userId, userId),
        sql`date >= ${twelveMonthsAgo}`
      )
    )
    .groupBy(sql`TO_CHAR(date, 'YYYY-MM')`)
    .orderBy(sql`TO_CHAR(date, 'YYYY-MM')`);

    const recurringResult = await db.select({
      startDate: recurringTransactions.startDate,
      endDate: recurringTransactions.endDate,
      amount: recurringTransactions.amount,
      type: recurringTransactions.type
    })
    .from(recurringTransactions)
    .where(
      and(
        eq(recurringTransactions.userId, userId),
        sql`start_date <= CURRENT_DATE`,
        sql`(end_date IS NULL OR end_date >= ${twelveMonthsAgo})`
      )
    );

    const combinedResults = new Map();

    transactionsResult.forEach(t => {
      combinedResults.set(t.month, {
        month: t.month,
        income: Number(t.income) || 0,
        expenses: Number(t.expenses) || 0
      });
    });

    const months = getLastTwelveMonths();
    months.forEach(monthDate => {
      const monthKey = monthDate.toISOString().slice(0, 7);
      const monthStart = new Date(monthDate);
      const monthEnd = new Date(monthDate);
      monthEnd.setMonth(monthEnd.getMonth() + 1);

      let recurringIncome = 0;
      let recurringExpenses = 0;

      recurringResult.forEach(recurring => {
        const startDate = recurring.startDate ? new Date(recurring.startDate) : null;
        const endDate = recurring.endDate ? new Date(recurring.endDate) : null;

        if ((!startDate || startDate <= monthEnd) && 
            (!endDate || endDate >= monthStart)) {
          if (recurring.type === 'income') {
            recurringIncome += Number(recurring.amount);
          } else {
            recurringExpenses += Number(recurring.amount);
          }
        }
      });

      const existing = combinedResults.get(monthKey) || { month: monthKey, income: 0, expenses: 0 };
      combinedResults.set(monthKey, {
        month: monthKey,
        income: existing.income + recurringIncome,
        expenses: existing.expenses + recurringExpenses
      });
    });

    const currentDate = new Date();
    const currentMonthKey = currentDate.toISOString().slice(0, 7);
    const previousDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    const previousMonthKey = previousDate.toISOString().slice(0, 7);

    const currentMonthData = combinedResults.get(currentMonthKey) || { income: 0, expenses: 0 };
    const previousMonthData = combinedResults.get(previousMonthKey) || { income: 0, expenses: 0 };

    const currentTotal = currentMonthData.income - currentMonthData.expenses;
    const previousTotal = previousMonthData.income - previousMonthData.expenses;

    let percentageChange = 0;
    if (previousTotal !== 0) {
        percentageChange = ((currentTotal - previousTotal) / Math.abs(previousTotal)) * 100;
    } else if (currentTotal !== 0) {
        percentageChange = currentTotal > 0 ? 100 : -100;
    }

    const monthlyData = months.map(monthDate => {
      const monthKey = monthDate.toISOString().slice(0, 7);
      const monthData = combinedResults.get(monthKey) || { income: 0, expenses: 0 };
      return {
        month: monthDate.toLocaleString('default', { month: 'long' }),
        income: monthData.income,
        expenses: monthData.expenses,
        trend: `${percentageChange >= 0 ? 'Trending up' : 'Trending down'} by ${Math.abs(percentageChange).toFixed(1)}% this month`
      };
    });

    return monthlyData;
}

export function getLastTwelveMonths() {
    const months = []
    const current = new Date()
    current.setDate(1)
    for (let i = 0; i < 12; i++) {
      months.unshift(new Date(current))
      current.setMonth(current.getMonth() - 1)
    }
    return months
}

export const getRecentTransactions = async () => {
    const session = await auth()
    const userId = session?.user?.id
    if (!userId) return []

    const transactionsResult = await db.select({
            id: transactions.id,
            amount: transactions.amount,
            type: transactions.type,
            description: transactions.description,
            date: transactions.date
        })
        .from(transactions)
        .where(eq(transactions.userId, userId))
        .orderBy(desc(transactions.date))
        .limit(6)

    return transactionsResult
}