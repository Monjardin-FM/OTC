import { User } from 'modules/user/domain/entities/user';
import { SignInUserDTO } from './signin-user.dto';
import { UserRepository } from 'modules/user/domain/repositories/user.repository';
import { SignInUserException } from './exceptions/signin-user.exception';

export class SignInUserService {
  private readonly repository: UserRepository;

  public constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async execute({ email, password }: SignInUserDTO): Promise<User> {
    try {
      const data = await this.repository.signIn({ email, password });
      return data;
    } catch (error) {
      throw new SignInUserException();
    }
  }
}
