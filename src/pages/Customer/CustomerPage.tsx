import TableCustomer from "@/components/Customer/TableCustomer";
import PaginationBar from "@/components/PaginationBar";
import { buttonVariants } from "@/components/ui/button";
import { UseAppContext } from "@/context/UseAppContext";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

const CustomerPage = () => {
  const { customers, fetchAllCustomer } = UseAppContext();

  const [searchParams, setSearchParams] = useSearchParams();
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const itemsPerPage = 10;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages)
      setSearchParams({ page: String(page) });
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await fetchAllCustomer({
        page: currentPage,
        perPage: itemsPerPage,
        sortBy: "created_at",
        sortDirection: "desc",
        startDate: "2023-01-01",
        endDate: "2026-12-30",
      });
      if (data) {
        setTotalItems(data.total ?? 0);
      }

      setIsLoading(false);
    })();
  }, [currentPage, itemsPerPage]);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customer</h1>
        <Link
          to={`/customer/add-customer?redirect=${encodeURIComponent(
            location.pathname + location.search
          )}`}
          state={{ from: location }}
          className={buttonVariants()}
        >
          Add Customer
        </Link>
      </div>
      <p className="text-muted-foreground">
        A complete overview of your customers, making it easier to organize,
        update, and manage customer data.
      </p>
      <div className="px-4 lg:px-6">
        <TableCustomer
          isLoading={isLoading}
          paginatedData={customers}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <PaginationBar
        total={totalPages}
        onPageChange={handlePagination}
        page={currentPage}
      />
    </>
  );
};

export default CustomerPage;
