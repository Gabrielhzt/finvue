import { DollarSign } from "lucide-react"
import { columns } from "./column"
import { DataTable } from "./data-table"
import StatCard from "@/components/statCard"
import { PieChartComponent } from "@/components/pieChart"
import { getAllTransactions, getExpenseBreakdown, getIncomeBreakdown, getTotalExpenses } from "@/lib/data"
import { getTotalIncome } from "@/lib/data"

export default async function DemoPage() {
  const allTransactions = await getAllTransactions();
  const transformedTransactions = allTransactions.map(transaction => ({
    ...transaction,
    amount: parseFloat(transaction.amount),
    description: transaction.description ?? '',
    date: transaction.date ?? new Date()
  }));
  const totalExpenses = await getTotalExpenses();
  const totalIncome = await getTotalIncome();
  const incomeBreakdown = await getIncomeBreakdown();
  const expenseBreakdown = await getExpenseBreakdown();

  return (
    <div className="grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1 grid-rows-4 max-xl:grid-rows-none gap-4 max-lg::h-auto h-full">
        <div className="flex gap-4 col-span-2 max-sm:flex-col">
            <StatCard title="Monthly Income" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={totalIncome.value} percentage={totalIncome.percentage} />
            <StatCard title="Monthly Expenses" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={totalExpenses.value} percentage={totalExpenses.percentage} />
        </div>
        <div className="col-span-1 row-span-2 max-lg:col-span-2">
            <PieChartComponent data={incomeBreakdown} title="Incomes" />
        </div>
        <div className="col-span-2 row-span-3 row-start-2 max-lg:col-span-2 max-sm:row-start-2">
            <DataTable columns={columns} data={transformedTransactions} />
        </div>
        <div className="col-span-1 row-span-2 max-lg:col-span-2">
            <PieChartComponent data={expenseBreakdown} title="Expenses" />
        </div>
    </div>
  )
}
