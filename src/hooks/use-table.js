import { useMemo } from 'react';
import { applyPagination } from '../utils/apply-pagination';
import { usePagination } from './use-pagination';
import { useSelection } from './use-selection';

export const useTable = (props) => {
  const {data, getPageItems, initialPage, initialRowsPerPage} = props;
  const {page, rowsPerPage, onPageChange, onRowsPerPageChange} = usePagination({initialPage, initialRowsPerPage});

  const items = useMemo(
    () => {
      return getPageItems?.() || applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );

  const ids = useMemo(
    () => {
      return items.map((_, index) => index);
    },
    [items]
  );

  const {onDeselectAll, onDeselectOne, onSelectAll, onSelectOne, selected} = useSelection(ids)

  return {
    items,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onDeselectAll,
    onDeselectOne,
    onSelectAll,
    onSelectOne,
    selected,
  }
}