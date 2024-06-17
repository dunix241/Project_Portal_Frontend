import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, IconButton, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { ReactNode, useState } from 'react';

type SearchProps = {
  placeholder?: string,
  searchText?: string,
  setSearchText?: (searchText: string) => any,
  lazySearch?: boolean
}

export const Search = (props: SearchProps): ReactNode => {
  const {placeholder, searchText, setSearchText, lazySearch} = props;
  const [value, setValue] = useState(searchText || '')
  const handleChange = (val) => {
    if (lazySearch) {
      setValue(val);
    } else {
      setSearchText?.(val) || setValue(val)
    }
  }

  return <Card sx={{ p: 2 }}>
    <OutlinedInput
      value={value || ''}
      onChange={(event) => handleChange(event.target.value)}
      fullWidth
      placeholder={placeholder || 'Search ...'}
      {...(lazySearch ?
          {
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setSearchText?.(value)}
                  edge="end"
                >
                  <SvgIcon
                    fontSize={'small'}
                  >
                    <MagnifyingGlassIcon/>
                  </SvgIcon>
                </IconButton>
              </InputAdornment>
          }
          : {
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  color="action"
                  fontSize="small"
                >
                  <MagnifyingGlassIcon/>
                </SvgIcon>
              </InputAdornment>
            )
          }
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>
};
