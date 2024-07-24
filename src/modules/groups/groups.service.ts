import { InMemoryDatabase } from "~/models/inMemdb";
import { Group, groupSchema } from "~/modules/groups/models/groups.model";
import { Expenceses, expencesesSchema } from "./expenceses/model/expenceses.model";
import { HttpStatusCode } from "~/utils/httpCodes";
import { HttpError } from "~/utils/httpError";
import { User } from "../users/models/user.model";

export class GroupsService {
  private groupDB: InMemoryDatabase<Group>;

  constructor() {
    this.groupDB = new InMemoryDatabase<Group>(groupSchema);
  }

  public createGroup(group: Group, currentUser: User): Group {
    const existingGroup = this.groupDB.list().find((g) => g.name === group.name);
    if (existingGroup) {
      throw new HttpError(HttpStatusCode.BAD_REQUEST, "Group already exists");
    }
    return this.groupDB.create({ ...group, id: 0, userlist: [currentUser.id] });
  }

  public deletGroup(id: number): Group | undefined {
    const existingGroup = this.groupDB.list().find((g) => g.id === id);
    if (!existingGroup) {
      throw new HttpError(HttpStatusCode.NOT_FOUND, "Group not found");
    }
    return this.groupDB.delete(id);
  }

  public addExpenceses(groupId: number, expences: Expenceses, users: User[]): Group {
    const existingGroup = this.groupDB.list().find((g) => g.id === groupId);
    if (!existingGroup) {
      throw new HttpError(HttpStatusCode.NOT_FOUND, "Group not found");
    }
    const updatedGroup = this.groupDB.update(groupId, {
      expences: [...(existingGroup.expences ?? []), expences],
      userlist: [...new Set([...existingGroup.userlist, ...users.map((u) => u.id)])],
    });
    if (!updatedGroup) {
      throw new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Failed to add expences");
    }
    return updatedGroup;
  }

  public getAllgroups(): Group[] {
    return this.groupDB.list();
  }

  public getGroupById(groupId: number): Group | undefined {
    const existingGroup = this.groupDB.list().find((g) => g.id === groupId);
    if (!existingGroup) {
      throw new HttpError(HttpStatusCode.NOT_FOUND, "Group not found");
    }
    return this.groupDB.findById(groupId);
  }

  public getExpenceses(groupId: number): Expenceses[] {
    const existingGroup = this.groupDB.list().find((g) => g.id === groupId);
    if (!existingGroup) {
      throw new HttpError(HttpStatusCode.NOT_FOUND, "Group not found");
    }
    return existingGroup.expences ?? [];
  }
}
