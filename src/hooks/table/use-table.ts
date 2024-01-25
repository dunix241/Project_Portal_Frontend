import {useEffect, useMemo, useState} from 'react';
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
type Pagination = {
  count: number
}
type UseTableProps = {
  data: any[],
  getPageItems?: (props: GetPageItemsProps) => {items: any[], pagination: Pagination},
  pageItemsResult?: {items: any[], pagination: Pagination}
  initialPage: number,
  initialRowsPerPage: number,
}
export type TableProps = {
  items: any[];
  count: number;
  ids: any[];
} & PaginationProps & SelectionProps & SortFilterProps
export const useTable = (props: UseTableProps): {
  onSelectAll: () => void;
  onRowsPerPageChange: (event: any) => void;
  count: number;
  onPageChange: (event: any, value: number) => void;
  onSelectOne: (id: any) => void;
  orderBy: string;
  rowsPerPage: number;
  onDeselectAll: () => void;
  onRequestSort: (property: any) => (event: any) => void;
  page: number;
  onDeselectOne: (id: any) => void;
  items: any[];
  ids: any[];
  selected: any[];
  order: string
} => {
  const {data, pageItemsResult, getPageItems, initialPage = 0, initialRowsPerPage = 5} = props;
  const {page, rowsPerPage, onPageChange, onRowsPerPageChange} = usePagination({initialPage, initialRowsPerPage});
  const {orderBy, order, onRequestSort} = useSortFilter();
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (getPageItems) {
      getPageItems({page, rowsPerPage, orderBy, order});
    } else {
      setCount(data?.length)
      setItems(applySortPagination({data, page, rowsPerPage, orderBy, order}))
    }
  }, [data, page, rowsPerPage, orderBy, order]);

  useEffect(() => {
    if (pageItemsResult) {
      setItems(pageItemsResult.items)
      setCount(pageItemsResult.pagination?.count)
    }
  }, [pageItemsResult]);

  const ids = useMemo(
    (): any[] => {
      return items.map((_, index) => index);
    },
    [items]
  );

  const {onDeselectAll, onDeselectOne, onSelectAll, onSelectOne, selected} = useSelection(ids)

  return {
    items,
    ids,
    count,
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