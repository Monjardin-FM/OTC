import { MiaUserRepository } from 'modules/user/infrastructure/repositories/mia-user.repository';
import { SignInUserService } from 'modules/user/application/services/signin/signin-user.service';

const userRepository = new MiaUserRepository();
const signInUserService = new SignInUserService(userRepository);

export { signInUserService };
