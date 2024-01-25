import {
  Box,
  Button,
  Card,
  Checkbox, Collapse, IconButton,
  Stack, SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@mui/material';
import React, { Fragment, ReactNode, useState } from 'react';
import {Scrollbar} from './scrollbar';
import {TableProps} from '../hooks/table/use-table';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

type Column = {
  label: string,
  field: string,
  headerProps: any,
  cellProps: any,
  render?: (item: any) => ReactNode,
  sortable: boolean,
}
type Options = {
  sortable: boolean
}
type ETableProps = {
  count: number,
  columns: Column[],
  rowsPerPageOptions: number[],
  options: {
    sortable: boolean,
    collapsible?: {
      title?: string,
      renderCollapsibleRow: (item: any) => ReactNode,
    },
  },
  actions: {
    props: any;
    title: string;
    children: ReactNode;
    name: string,
    disabled: boolean,
    onClick: (item: any) => void
    render: () => ReactNode
  }[]
} & TableProps
export const ETable = (props: ETableProps) => {
  const {
    count = 0,
    items = [],
    columns = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    orderBy,
    order,
    onRequestSort,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    rowsPerPageOptions = [5, 10, 25],
    options,
    actions
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const collapsible = options.collapsible?.renderCollapsibleRow;
  const columnCount = columns.length + (collapsible ? 1 : 0) + (actions ? 1 : 0) + 1;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                {columns.map((column, index) => {
                  return <TableCell key={index} {...column.headerProps}>
                    <TableSortLabel
                        hideSortIcon
                        active={orderBy === column.field}
                        direction={orderBy === column.field ? order : 'asc'}
                        onClick={options?.sortable ? ((column.sortable === true || column.sortable === undefined) ? onRequestSort(column.field) : null) : (column.sortable ? onRequestSort(column.field) : null)}
                    >
                      {column.label}
                      {orderBy === column.field ? (
                          <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                })}
                {actions && <TableCell sx={{width: 0, textAlign: 'center'}}>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => {
                const isSelected = selected.includes(index);
                const [open, setOpen] = useState(false);

                return (
                  <Fragment key={index}>
                    <TableRow
                      hover
                      key={index}
                      selected={isSelected}
                      onClick={(e) => setOpen(!open)}
                      sx={{
                        cursor: collapsible ? 'pointer': 'unset',
                      }}
                      title={options.collapsible?.title}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(index);
                            } else {
                              onDeselectOne?.(index);
                            }
                          }}
                        />
                      </TableCell>
                      {columns.map((column, index) => {
                        return <TableCell key={index} {...column.cellProps}>
                          {column.render?.(item) || item[column.field]}
                        </TableCell>
                      })}
                      {actions && <TableCell>
                        <Stack direction={'row'}>
                          {actions.map((action, index) => {
                              return (
                                <Fragment key={index}>
                                  {action.render?.() || <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      action.onClick?.(item)
                                    }}
                                    disabled={action.disabled}
                                    title={action.title}
                                    {...action.props}
                                  >
                                    {action.children}
                                  </Button>}
                                </Fragment>
                              )
                            }
                          )}
                        </Stack>
                      </TableCell>}
                    </TableRow>
                    {
                      collapsible &&
                      <TableRow>
                        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columnCount}>
                          <Collapse in={open}>
                            {options.collapsible?.renderCollapsibleRow(item)}
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    }
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </Card>
  );
};
