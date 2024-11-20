'use client'

import { TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
    income: {
        label: "Income",
        color: "hsl(var(--chart-1))",
    },
    expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function BarChartComponent({ lastTwelveMonths, monthlyTransactions }: { 
    lastTwelveMonths: Date[], 
    monthlyTransactions: Array<{
        month: string;
        income: number | string;
        expenses: number | string;
        trend: string;
    }> 
}) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
                <div className="xl:h-[calc(100vh-415px)] group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100vh-400px)]">
                    <ChartContainer config={chartConfig} className="w-full xl:h-[calc(100vh-415px)] group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100vh-400px)]">
                        <BarChart accessibilityLayer data={monthlyTransactions}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm mt-auto">
                <div className="flex gap-2 font-medium leading-none">
                    {monthlyTransactions[monthlyTransactions.length - 1].trend} {
                        monthlyTransactions[monthlyTransactions.length - 1].trend.includes('up') 
                        ? <TrendingUp className="h-4 w-4" />
                        : <TrendingDown className="h-4 w-4" />
                    }
                </div>
                <div className="leading-none text-muted-foreground">
                Showing income and expenses for the last 12 months
                </div>
            </CardFooter>
        </Card>
    )
}
