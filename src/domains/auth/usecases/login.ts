import { InvalidInputData } from "shared/errors";
import { UserEntity } from "../entities";
import { InvalidSession, UserNotFound } from "../exceptions";
import { AuthRepositoryType } from "../repositories/auth";
import { SessionManagerType } from "../service/SessionManager";

type InputType = {
  email: string;
  password: string;
};

export class LoginUsecase {
  constructor(
    private authRepository: AuthRepositoryType,
    private sessionManager: SessionManagerType
  ) {}
  async execute(email: string, password: string) {
    this.validateInput({ email, password });
    const cleanedInput = this.cleanInput({ email, password });
    const user = this.getUser(cleanedInput.email);
    this.validatePassword(user, cleanedInput.password);
    return this.sessionManager.generateAccessToken(cleanedInput.email);
  }
  private validateInput(input: InputType) {
    if (!input.email || !input.password) {
      throw new InvalidInputData();
    }
  }
  private cleanInput(input: InputType) {
    return {
      email: input.email.trim(),
      password: input.password.trim(),
    };
  }
  private getUser(email: string) {
    const user = this.authRepository.getUser(email);
    if (!user) {
      throw new UserNotFound();
    }
    return user;
  }
  private validatePassword(user: UserEntity, passworrd: string) {
    if (user.password !== passworrd) throw new InvalidSession();
  }
}
