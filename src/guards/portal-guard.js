import { useAppSelector } from '../store/hooks';
import { selectCurrentUser } from '../store/authSlice';
import Error403 from '../components/errors/Error403';

export const PortalGuard = (props) => {
  const {children} = props;
  const user = useAppSelector(selectCurrentUser)

  if (!user || user?.roles.some(userRole => userRole.includes('Students') || userRole.includes('Lecturers'))) {
    return children;
  }

  return <Error403/>
}