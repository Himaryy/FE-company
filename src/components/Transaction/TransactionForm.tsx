import type { DetailsTransactionProps } from "@/lib/interfaces";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatCurrency, formatNumber, formatPercent } from "@/lib/formatValue";

interface TransactionFormProps {
  transaction: DetailsTransactionProps;
}

const TransactionForm = ({ transaction }: TransactionFormProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Basic Informastion */}
      <Card>
        <CardContent>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="codeCustomer" className="text-sm font-medium">
                  Customer Code
                </Label>
                <Input
                  readOnly
                  id="codeCustomer"
                  placeholder="CUST-001"
                  className="bg-background"
                  value={transaction.referenceNo}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Customer Name</Label>
                <Input
                  readOnly
                  id="name"
                  placeholder="John Doe"
                  className="bg-background"
                  value={transaction.customer.name}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="salesName" className="text-sm font-medium">
                  Sales Name
                </Label>
                <Input
                  readOnly
                  id="salesName"
                  placeholder="Lily"
                  className="bg-background"
                  value={transaction.sales}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Item Purhased */}
      <div className="overflow-hidden border rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted">
              <TableHead></TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Price Sub Total</TableHead>
              <TableHead>Margin Sub Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transaction?.items?.map((item, index) => (
              <TableRow key={index + 1}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{formatNumber(item.quantity)}</TableCell>
                <TableCell>{formatCurrency(item.price)}</TableCell>
                <TableCell>{formatPercent(item.discount)}</TableCell>
                <TableCell>{formatCurrency(item.priceSubtotal)}</TableCell>
                <TableCell>{formatCurrency(item.marginSubtotal)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Payment Summary */}
      <Card>
        <CardContent>
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              Payment Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="amountDue" className="text-sm font-medium">
                  Amount Due
                </Label>
                <Input
                  readOnly
                  id="amountDue"
                  placeholder="CUST-001"
                  className="bg-background"
                  value={formatCurrency(transaction.amountDue)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="amountUntaxed" className="text-sm font-medium">
                  Amount Untaxed
                </Label>
                <Input
                  readOnly
                  id="amountUntaxed"
                  placeholder="John Doe"
                  className="bg-background"
                  value={formatCurrency(transaction.amountUntaxed)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="amountTotal" className="text-sm font-medium">
                  Amount Total
                </Label>
                <Input
                  readOnly
                  id="amountTotal"
                  placeholder="Lily"
                  className="bg-background"
                  value={formatCurrency(transaction.amountTotal)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="dateOrder" className="text-sm font-medium">
                  Date Order
                </Label>
                <Input
                  readOnly
                  id="dateOrder"
                  placeholder="Lily"
                  className="bg-background"
                  value={transaction.dateOrder}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="dateDue" className="text-sm font-medium">
                  Date Due
                </Label>
                <Input
                  readOnly
                  id="dateDue"
                  placeholder="Lily"
                  className="bg-background"
                  value={transaction.dateDue}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="paidAt" className="text-sm font-medium">
                  Paid At
                </Label>
                <Input
                  readOnly
                  id="paidAt"
                  placeholder="Lily"
                  className="bg-background"
                  value={transaction.paidAt}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForm;
