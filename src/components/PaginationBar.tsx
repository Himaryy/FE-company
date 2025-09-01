import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface TablePaginationProps {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

const PaginationBar = ({ page, total, onPageChange }: TablePaginationProps) => {
  return (
    <Pagination className="">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page - 1);
            }}
            className="cursor-default"
          />
        </PaginationItem>

        {/* Render angka */}
        <span className="mx-2 text-sm">
          Page {page} of {total}
        </span>

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              onPageChange(page + 1);
            }}
            className="cursor-default"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBar;
