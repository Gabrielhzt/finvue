import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Transaction = {
    id: string
    amount: string
    type: 'expense' | 'income'
    description: string | null
    date: Date | null
}

export default function TransactionsCard({ transactions }: { transactions: Transaction[] }) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {transactions.map((transaction, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarFallback>{transaction.description?.slice(0, 1) || ''}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                                {transaction.date ? transaction.date.toLocaleDateString() : ''}
                            </p>
                        </div>
                        <div className={`ml-auto font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
} 