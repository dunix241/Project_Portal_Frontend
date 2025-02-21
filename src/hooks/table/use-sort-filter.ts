import {useCallback, useState} from "react";

export type SortFilterProps = {
    orderBy: string,
    order: string,
    onRequestSort: (property: any) => (event: any) => void
}
export const useSortFilter = (): SortFilterProps => {
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('');

    const onRequestSort = useCallback((property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, [order, orderBy]);

    return {
        orderBy,
        order,
        onRequestSort
    }
}
