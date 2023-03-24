import { mockUsers } from "./mockUsers";

export class AuthRepository {
  public static getUser(email: string) {
    return mockUsers.find((user) => user.email == email);
  }
}

export type AuthRepositoryType = typeof AuthRepository;
