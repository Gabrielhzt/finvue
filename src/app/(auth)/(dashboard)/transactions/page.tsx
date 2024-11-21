import { DollarSign } from "lucide-react"
import { Payment, columns } from "./column"
import { DataTable } from "./data-table"
import StatCard from "@/components/statCard"
import { PieChartComponent } from "@/components/pieChart"
import { getTotalExpenses } from "@/lib/data"
import { getTotalIncome } from "@/lib/data"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()
  const totalExpenses = await getTotalExpenses();
  const totalIncome = await getTotalIncome();

  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 grid-rows-4 max-sm:grid-rows-none gap-4 h-[calc(100vh-80px)] min-h-[600px] max-lg:h-auto">
        <div className="flex gap-4 col-span-2 max-sm:flex-col">
            <StatCard title="Monthly Income" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={totalIncome.value} percentage={totalIncome.percentage} />
            <StatCard title="Monthly Expenses" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={totalExpenses.value} percentage={totalExpenses.percentage} />
        </div>
        <div className="col-span-1 row-span-2 max-lg:col-span-2">
            <PieChartComponent />
        </div>
        <div className="col-span-2 row-span-3 row-start-2 max-lg:col-span-2 max-sm:row-start-2">
            <DataTable columns={columns} data={data} />
        </div>
        <div className="col-span-1 row-span-2 max-lg:col-span-2">
            <PieChartComponent />
        </div>
    </div>
  )
}
