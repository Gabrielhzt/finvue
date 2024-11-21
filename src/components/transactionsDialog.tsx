import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TransactionsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Transaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>
            Add a new transaction to the list.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="amount">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">
              Type
            </Label>
            <Input
              id="type"
              type="text"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">
              Description
            </Label>
            <Input
              id="description"
              type="text"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">
              Date
            </Label>
            <Input
              id="date"
              type="date"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button type="submit">
            Add Transaction
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}