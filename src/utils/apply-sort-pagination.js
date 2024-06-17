function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, searchText) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter(_user => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export function applySortPagination(props) {
  const {data, mapItem, page, rowsPerPage, order, orderBy, searchText} = props;
  let result = applySortFilter(data, getComparator(order, orderBy), null, searchText).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  if (searchText) {
    result = result.filter(item => {
      return toArray(mapItem?.(item) || item).some(value => `${value}`.toLowerCase().includes(searchText.toLowerCase()))
    })
  }
  return result;
}

const toArray = (obj) => {
  if (_.isFunction(obj)) {
    return [];
  }
  if (_.isArray(obj)) {
    return obj
  }
  if (!_.isObject(obj)) {
    return [obj];
  }
  let result = [];
  for (let prop in obj) {
    result = [...result, ...toArray(obj[prop])]
  }
  return result;
}