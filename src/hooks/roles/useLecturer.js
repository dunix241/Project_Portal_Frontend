import { useAppSelector } from '../../store/hooks';
import { selectCurrentUser } from '../../store/authSlice';

export default function useLecturer() {
  const user = useAppSelector(selectCurrentUser)
  return user?.roles.some(role => role.includes('Lecturers'))
}