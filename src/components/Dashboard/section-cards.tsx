import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatValue";
import { Badge } from "../ui/badge";
import { IconTrendingUp } from "@tabler/icons-react";
import type {
  DailyTransactionsProps,
  YearlyTransactionProps,
  ListSalesResponse,
  ListSalesItems,
} from "@/lib/interfaces";

interface SectionCardsProps {
  daily?: DailyTransactionsProps | null;
  sales?: ListSalesItems[];
  yearly?: YearlyTransactionProps | null;
}

export function SectionCards({ daily, sales, yearly }: SectionCardsProps) {
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
          <CardDescription>Total Sales</CardDescription>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
            {sales?.length ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <div className="flex justify-between">
            <CardDescription>Yearly Revenue</CardDescription>
            <Badge variant="outline">
              <IconTrendingUp />
              {yearly?.percentage}
            </Badge>
          </div>
          <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-xl">
            {formatCurrency(yearly?.current?.amount ?? "0")}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
