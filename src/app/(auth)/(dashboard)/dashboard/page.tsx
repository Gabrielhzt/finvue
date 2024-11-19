import { BarChartComponent } from "@/components/barChart"
import StatCard from "@/components/statCard"
import TransactionsCard from "@/components/transactionsCard"
import { DollarSign } from "lucide-react"

export default async function Dashboard() {
    return (
        <div className={`flex flex-col gap-4 w-full h-[calc(100vh-100px)] group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-[calc(100vh-80px)] group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-lg:h-auto max-xl:h-auto`}>
            <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4 w-full">
                <StatCard title="Total Expenses" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value="$4,231.89" percentage="+12.1%" />
                <StatCard title="Monthly Bills" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value="$2,234.53" percentage="+5.3%" />
                <div className="max-sm:hidden">
                    <StatCard title="Savings" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value="$1,456.78" percentage="+8.5%" />
                </div>
                <div className="max-sm:hidden">
                    <StatCard title="Investments" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value="$765.32" percentage="+15.2%" />
                </div>
            </div>
            <div className={`flex gap-4 w-full flex-1 max-xl:flex-col group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-xl:flex-row group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-lg:flex-col`}>
                <div className="w-3/5 max-xl:w-full group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-lg:w-full group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-xl:w-3/5">
                    <BarChartComponent />
                </div>
                <div className="w-2/5 max-xl:w-full h-full group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-lg:w-full group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-xl:w-2/5">
                    <TransactionsCard />
                </div>
            </div>
        </div>
    )
}