import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface TablePaginationProps {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
}

const PaginationBar = ({ page, total, onPageChange }: TablePaginationProps) => {
  const renderPageNumber = () => {
    const pages = [];

    for (let i = 1; i <= total; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={page === i}
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
            className="cursor-default"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

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
        {renderPageNumber()}

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
