import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatValue";
import type {
  DailyTransactionsProps,
  YearlyTransactionProps,
} from "@/lib/interfaces";

interface TransactionFormProps {
  total: number;
  daily?: DailyTransactionsProps | null;
  yearly?: YearlyTransactionProps | null;
}

export function TransactionCard({
  total,
  daily,
  yearly,
}: TransactionFormProps) {
  return (
    // @5xl/main:grid-cols-4
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 lg:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Daily Transactions</CardDescription>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
            {daily?.items.length}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Transactions</CardDescription>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
            {total}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
            {formatCurrency(yearly?.current.amount ?? "0")}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
