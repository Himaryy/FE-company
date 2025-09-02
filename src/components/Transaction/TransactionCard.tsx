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
import { Badge } from "../ui/badge";
import { IconTrendingUp } from "@tabler/icons-react";

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
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 lg:grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 ">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Daily Transactions</CardDescription>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
            {daily?.items.length ?? "0"}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Transactions</CardDescription>
          <div className="flex flex-col gap-2">
            <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
              {total ?? "0"}
            </CardTitle>
            <span className="text-xs text-muted-foreground">In One Year</span>
          </div>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <div className="flex justify-between">
            <CardDescription>Yearly Revenue</CardDescription>
            <Badge className="text-green-600" variant="outline">
              <IconTrendingUp />
              {yearly?.percentage} %
            </Badge>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
            {formatCurrency(yearly?.current.amount ?? "0")}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
