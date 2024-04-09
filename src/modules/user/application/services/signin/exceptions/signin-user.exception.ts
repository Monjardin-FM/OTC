import { AuthenticationException } from 'application/exceptions/authentication.exeption';

export class SignInUserException extends AuthenticationException {
  constructor() {
    super(
      'signin_user_exception',
      'An error occurred while trying to authenticate the user',
    );
  }
}
