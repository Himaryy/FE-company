import TransactionForm from "@/components/Transaction/TransactionForm";
import { buttonVariants } from "@/components/ui/button";
import { UseAppContext } from "@/context/UseAppContext";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailsTransactionPage = () => {
  const { no } = useParams();
  const { detailsTransactionData, getDetailsTransaction } = UseAppContext();
  const [isLoading, setIsLoading] = useState(false);

  // fetch data
  useEffect(() => {
    (async () => {
      if (!no) return;

      setIsLoading(true);
      await getDetailsTransaction(no);
      setIsLoading(false);
    })();
  }, [no]);

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          to="/transaction"
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="text-xl font-bold">
          Details Transaction - {detailsTransactionData?.referenceNo}
        </h1>
      </div>

      <div className="px-4 lg:px-6">
        {isLoading ? (
          <div className="flex items-center justify-center gap-4 h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            Loading ...
          </div>
        ) : (
          detailsTransactionData && (
            <TransactionForm transaction={detailsTransactionData} />
          )
        )}
      </div>
    </>
  );
};

export default DetailsTransactionPage;
