import { Avatar, Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { useGetProjectOverviewQuery, useListProjectsQuery } from '../../../agent/projectApliSlice';
import { useCallback, useMemo } from 'react';
import { reducerBuilder } from '../../../utils/reducer-builder';
import { useAsyncReducer } from '../../../hooks/use-async-reducer';
import NextLink from 'next/link';
import { useListLecturersQuery } from '../../../agent/lecturerApliSlice';
import { stringAvatar, stringToColor } from '../../../utils/avatar';
import NoData from '../../../components/no-data';
import CardSkeleton from '../../../components/cardSkeleton';

export default function LecturerList(props) {
  const {
    data: lecturerData,
    isFetching: isFetchingLecturer,
    isLoading: isLoadingLecturer,
    error: lecturerError
  } = useListLecturersQuery({page: 0, rowsPerPage: 100});

  const actionHandlers = useCallback((state, action) => {
    const { type, payload, dispatch } = action;
    return [
      [true, state],
    ]
  }, []);

  const reducer = useMemo(() => reducerBuilder(actionHandlers), [actionHandlers]);
  const initialState = useMemo(() => ({}), [])
  const asyncReducer = useMemo(() => ({}), [])
  const [state, pageDispatch] = useAsyncReducer(reducer, initialState, asyncReducer);

  return <Box>
    <Typography variant={'h2'} sx={{my: 5}}>
      Supervisors
    </Typography>
    <Stack
      direction={'row'}
      sx={{
        maxWidth: '100%',
        flexWrap: 'wrap',
        gap: 2
      }}
    >
      {lecturerError && <NoData onRetry={() => console.log('retrying')} resourceName={'Lecturers'}/>}
      {isFetchingLecturer && <Grid container sx={{ gap: 2 }}>
        {[1, 2].map((item, index) =>
          <CardSkeleton
            cardProps={{
              sx: {
                display: 'block',
                width: {
                  lg: 184,
                  sm: 170,
                  xs: 155
                },
                textDecoration: 'none',
                position: 'relative',
                borderRadius: 4
              }
            }}
          />
        )}
      </Grid>}
      {lecturerData?.items.map((item, index) => <Card
        key={index}
        component={NextLink}
        href={`/portal/profiles/lecturers/${item.id}`}
        sx={{
          display: 'block',
          width: {
            lg: 184,
            sm: 170,
            xs: 155
          },
          textDecoration: 'none',
          position: 'relative',
          borderRadius: 4
        }}
      >
        <CardContent>
          <Stack sx={{gap: 1.5, textAlign: 'center', justifyContent: 'center'}}>
            <Stack sx={{gap: 0.75, mb: 12}}>
              <Avatar
                sx={{
                  cursor: 'pointer',
                  height: 100,
                  width: 100,
                  bgcolor: stringToColor(item?.fullName || ''),
                  m: 'auto'
                }}
              >
                {stringAvatar(item?.fullName || '')}
              </Avatar>
              <Box>
                <Typography variant={'body1'} fontWeight={'bold'}>{item.title} {item.fullName}</Typography>
                <Typography variant={'body2'}>{item.headline}</Typography>
              </Box>
            </Stack>

            <Stack sx={{px: 2, pb: 2, gap: 1, position: 'absolute', bottom: 0, left: 0}}>
              <Typography variant={'caption'}>{item.schoolName}</Typography>
              <Button>Details</Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>)}
    </Stack>
  </Box>
}