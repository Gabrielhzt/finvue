'use client'

import { TrendingUp } from "lucide-react"
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

const chartData = [
    { month: "January", income: 4560, expenses: 3200 },
    { month: "February", income: 5285, expenses: 4100 },
    { month: "March", income: 4977, expenses: 3820 },
    { month: "April", income: 5153, expenses: 4290 },
    { month: "May", income: 5489, expenses: 4130 },
    { month: "June", income: 5194, expenses: 4340 },
    { month: "July", income: 5394, expenses: 4240 },
    { month: "August", income: 5594, expenses: 4440 },
    { month: "September", income: 5294, expenses: 4140 },
    { month: "October", income: 5494, expenses: 4540 },
    { month: "November", income: 5694, expenses: 4640 },
    { month: "December", income: 5894, expenses: 4740 },
]

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

export function BarChartComponent() {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
                <div className="xl:h-[calc(100vh-415px)] group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100vh-400px)]">
                    <ChartContainer config={chartConfig} className="w-full xl:h-[calc(100vh-415px)] group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100vh-400px)]">
                        <BarChart accessibilityLayer data={chartData}>
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
                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                Showing income and expenses for the last 12 months
                </div>
            </CardFooter>
        </Card>
    )
}
