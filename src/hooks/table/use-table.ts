import { memo, useEffect, useMemo, useState } from 'react';
import { applySortPagination } from '../../utils/apply-sort-pagination';
import { PaginationProps, usePagination } from './use-pagination';
import { SelectionProps, useSelection } from './use-selection';
import {SortFilterProps, useSortFilter} from "./use-sort-filter";

type GetPageItemsProps = {
  page: number,
  rowsPerPage: number,
  order: string,
  orderBy: string,
  searchText: string
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
  options: {
    searching: {
      mapItem: (item: any) => any
    }
  }
  mapItem: (item: any) => any
}
export type TableProps = {
  items: any[];
  count: number;
  ids: any[];
  useSearch: () => {searchText: string, setSearchText: (value: string) => any, lazySearch: boolean}
} & PaginationProps & SelectionProps & SortFilterProps

export const useTable = (props: UseTableProps, dependencies?: any[]): {
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
  order: string,
  useSearch: any
} => {
  const {data, pageItemsResult, getPageItems, initialPage = 0, initialRowsPerPage = 5, options} = props;
  const {page, rowsPerPage, onPageChange, onRowsPerPageChange} = usePagination({initialPage, initialRowsPerPage});
  const {orderBy, order, onRequestSort} = useSortFilter();
  const [searchText, setSearchText] = useState('');
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [finalizedData, setFinalizedData] = useState(null);

  useEffect(() => {
    Promise.resolve(data).then(data => setFinalizedData(data))
  }, [data]);

  useEffect(() => {
    console.log('use table called');
    console.log(data, pageItemsResult);
    if (getPageItems) {
      getPageItems({page, rowsPerPage, orderBy, order, searchText});
    } else if (finalizedData) {
      setCount(finalizedData?.length)
      setItems(applySortPagination({data: finalizedData, mapItem: options?.searching?.mapItem, page, rowsPerPage, orderBy, order, searchText}))
    }
  }, [finalizedData, page, rowsPerPage, orderBy, order, searchText, ...(dependencies || [])]);

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
    onRequestSort,
    useSearch: () => ({searchText, setSearchText, lazySearch: !!getPageItems})
  }
}