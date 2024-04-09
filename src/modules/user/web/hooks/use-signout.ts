import { useAppDispatch } from 'presentation/hooks/use-store';
import { signOut } from 'modules/user/web/user.reducer';

export const useSignOut = () => {
  const dispatch = useAppDispatch();

  const execute = () => dispatch(signOut());

  return { execute };
};
