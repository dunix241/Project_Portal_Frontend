import { useCallback, useState } from 'react';

type UsePaginationProps = {
  initialPage: number,
  initialRowsPerPage: number
}
export type PaginationProps = {
  page: number,
  rowsPerPage: number,
  onPageChange: (event: any, value: number) => void,
  onRowsPerPageChange: (event: any) => void
}
export const usePagination = ({initialPage, initialRowsPerPage}: UsePaginationProps): PaginationProps => {
  const [page, setPage] = useState(initialPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage || 5);

  const onPageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const onRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return {
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange
  }
}
