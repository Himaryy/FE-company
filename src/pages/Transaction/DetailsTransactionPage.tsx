import TransactionForm from "@/components/Transaction/TransactionForm";
import { buttonVariants } from "@/components/ui/button";
import { UseAppContext } from "@/context/UseAppContext";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const DetailsTransactionPage = () => {
  const { no } = useParams();
  const { detailsTransactionData, getDetailsTransaction } = UseAppContext();

  // fetch data
  useEffect(() => {
    if (no) {
      getDetailsTransaction(no);
    }
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
        {detailsTransactionData ? (
          <TransactionForm transaction={detailsTransactionData} />
        ) : (
          <p>Loading..</p>
        )}
      </div>
    </>
  );
};

export default DetailsTransactionPage;
