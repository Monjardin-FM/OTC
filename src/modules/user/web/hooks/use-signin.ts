import { useAppDispatch } from 'presentation/hooks/use-store';
import { signIn } from 'modules/user/web/user.reducer';

export const useSignIn = () => {
  const dispatch = useAppDispatch();

  const execute = ({ email, password }: { email: string; password: string }) =>
    dispatch(signIn({ email, password }));

  return { execute };
};
