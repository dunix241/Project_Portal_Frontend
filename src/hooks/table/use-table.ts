import { useMemo } from 'react';
import { applySortPagination } from '../../utils/apply-sort-pagination';
import { PaginationProps, usePagination } from './use-pagination';
import { SelectionProps, useSelection } from './use-selection';
import {SortFilterProps, useSortFilter} from "./use-sort-filter";

type GetPageItemsProps = {
  page: number,
  rowsPerPage: number,
  order: string,
  orderBy: string,
}
type UseTableProps = {
  data: any[],
  getPageItems?: (props: GetPageItemsProps) => any[],
  initialPage: number,
  initialRowsPerPage: number
}
export type TableProps = {
  items: any[]
} & PaginationProps & SelectionProps & SortFilterProps
export const useTable = (props: UseTableProps): TableProps => {
  const {data, getPageItems, initialPage = 0, initialRowsPerPage = 5} = props;
  const {page, rowsPerPage, onPageChange, onRowsPerPageChange} = usePagination({initialPage, initialRowsPerPage});
  const {orderBy, order, onRequestSort} = useSortFilter();

  const items = useMemo(
    (): any[] => {
      return getPageItems?.({page, rowsPerPage, orderBy, order}) || applySortPagination({data, page, rowsPerPage, orderBy, order});
    },
    [page, rowsPerPage, orderBy, order]
  );

  const ids = useMemo(
    (): any[] => {
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
    orderBy,
    order,
    onRequestSort
  }
}