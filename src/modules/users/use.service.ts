import { InMemoryDatabase } from "~/models/inMemdb";
import { Role, User, userSchema } from "~/modules/users/models/user.model";
import { UserAuth } from "./dto/user-auth.dto";
import { HttpError } from "~/utils/httpError";
import { HttpStatusCode } from "~/utils/httpCodes";

export class UserService {
  private userDB: InMemoryDatabase<User>;

  constructor() {
    this.userDB = new InMemoryDatabase<User>(userSchema);
  }

  public signUp(userAuth: UserAuth): User {
    const existingUser = this.userDB.list().find((u) => u.username === userAuth.username);
    // const existingUser = this.userDB.find((u) => u.username === user.username);
    if (existingUser) {
      throw new HttpError(HttpStatusCode.BAD_REQUEST, "Username already exists");
    }
    return this.userDB.create({ ...userAuth, id: 0, role: Role.user, groupsJoined: [] });
  }

  public login(dto: UserAuth): User {
    // auth also
    const user = this.userDB
      .list()
      .find((u) => u.username === dto.username && u.password === dto.password);
    console.log(this.userDB.list(), dto);
    if (!user) throw new HttpError(HttpStatusCode.UNAUTHORIZED, "User not found");
    return user;
  }
}
