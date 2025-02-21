import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/authSlice';
import { Box } from '@mui/material';
import Error403 from '../components/errors/Error403';

export const CmsGuard = (props) => {
  const {children} = props;
  const user = useAppSelector(selectCurrentUser)

  if (!user || user?.roles.some(userRole => userRole.includes('Admins'))) {
    return children;
  }

  return <Error403/>
}