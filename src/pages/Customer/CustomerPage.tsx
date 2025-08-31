import TableCustomer from "@/components/Customer/TableCustomer";
import PaginationBar from "@/components/PaginationBar";
import { buttonVariants } from "@/components/ui/button";
import { UseAppContext } from "@/context/UseAppContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const CustomerPage = () => {
  const { customers } = UseAppContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalItems = customers.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedCustomer = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePagination = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customer</h1>
        <Link to="/customer/add-customer" className={buttonVariants()}>
          Add Customer
        </Link>
      </div>
      <h1>Here you will see all the customer</h1>
      <div className="">
        <TableCustomer
          paginatedData={paginatedCustomer}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </div>

      <div className="">
        <PaginationBar
          total={totalPages}
          onPageChange={handlePagination}
          page={currentPage}
        />
      </div>
    </>
  );
};

export default CustomerPage;
