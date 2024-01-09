import { useCallback, useState } from 'react';

export const usePagination = ({initialPage, initialRowsPerPage}) => {
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
