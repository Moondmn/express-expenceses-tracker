import { UserService } from "~/modules/users/use.service";
import { GroupsService } from "~/modules/groups/groups.service";

export const userService = new UserService();
export const groupsService = new GroupsService();
