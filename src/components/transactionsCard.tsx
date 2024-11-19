import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Transaction = {
    avatar: string
    initials: string
    name: string
    description: string
    amount: string
    type: 'credit' | 'debit'
}

const transactions: Transaction[] = [
    {
        avatar: "/avatars/01.png",
        initials: "OM",
        name: "Olivia Martin",
        description: "Rent Payment",
        amount: "1,850.00",
        type: "debit"
    },
    {
        avatar: "/avatars/02.png",
        initials: "JL",
        name: "Grocery Store",
        description: "Weekly Groceries",
        amount: "245.32",
        type: "debit"
    },
    {
        avatar: "/avatars/03.png",
        initials: "IN",
        name: "Salary Deposit",
        description: "Monthly Income",
        amount: "4,500.00",
        type: "credit"
    },
    {
        avatar: "/avatars/04.png",
        initials: "UB",
        name: "Utility Bills",
        description: "Electricity & Water",
        amount: "185.50",
        type: "debit"
    },
    {
        avatar: "/avatars/05.png",
        initials: "RS",
        name: "Restaurant",
        description: "Dining Out",
        amount: "75.20",
        type: "debit"
    }
]

export default function TransactionsCard() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
                {transactions.map((transaction, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                            <AvatarImage src={transaction.avatar} alt="Avatar" />
                            <AvatarFallback>{transaction.initials}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">{transaction.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {transaction.description}
                            </p>
                        </div>
                        <div className={`ml-auto font-medium ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                            {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
} 