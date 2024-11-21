import { BarChartComponent } from "@/components/barChart"
import StatCard from "@/components/statCard"
import TransactionsCard from "@/components/transactionsCard"
import { getLastTwelveMonths, getMonthlyTransactions, getRecentTransactions, getTotalBalance, getTotalExpenses, getTotalIncome, getTotalRecurringTransactions } from "@/lib/data"
import { DollarSign } from "lucide-react"

export default async function Dashboard() {
    const totalBalance = await getTotalBalance();
    const totalExpenses = await getTotalExpenses();
    const totalIncome = await getTotalIncome();
    const totalRecurringTransactions = await getTotalRecurringTransactions();
    const lastTwelveMonths = await getLastTwelveMonths();
    const monthlyTransactions = await getMonthlyTransactions();
    const recentTransactions = await getRecentTransactions();

    return (
        <div className={`flex flex-col gap-4 w-full h-full`}>
            <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 w-full">
                <StatCard title="Total Balance" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={totalBalance.value} percentage={totalBalance.percentage} />
                <StatCard title="Monthly Income" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={totalIncome.value} percentage={totalIncome.percentage} />
                <div className="max-sm:hidden">
                    <StatCard title="Monthly Expenses" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={totalExpenses.value} percentage={totalExpenses.percentage} />
                </div>
                <div className="max-sm:hidden">
                    <StatCard title="Recurring Transactions" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value={totalRecurringTransactions.value} percentage={totalRecurringTransactions.percentage} />
                </div>
            </div>
            <div className={`flex gap-4 w-full flex-1 max-xl:flex-col group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-xl:flex-row group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-lg:flex-col`}>
                <div className="w-3/5 max-xl:w-full group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-lg:w-full group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-xl:w-3/5">
                    <BarChartComponent lastTwelveMonths={lastTwelveMonths} monthlyTransactions={monthlyTransactions} />
                </div>
                <div className="w-2/5 max-xl:w-full h-full group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-lg:w-full group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-xl:w-2/5">
                    <TransactionsCard transactions={recentTransactions} />
                </div>
            </div>
        </div>
    )
}