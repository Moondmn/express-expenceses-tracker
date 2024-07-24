import { Router } from "express";
import { groupsService } from "~/dependencies";
import { groupSchema } from "~/modules/groups/models/groups.model";
import { User } from "~/modules/users/models/user.model";
import { handleExpress } from "~/utils/expressHandler";

export const router = Router();

router.post("/", (req, res) => {
  const dto = groupSchema.parse(req.body);
  const currentUser: User = res.locals.currentUser;
  handleExpress(res, () => groupsService.createGroup(dto, currentUser));
});

router.get("/", (req, res) => {
  handleExpress(res, () => groupsService.getAllgroups);
});

router.get("/:id", (req, res) => {
  const groupId = parseInt(req.params.id);
  handleExpress(res, () => groupsService.getGroupById(groupId));
});

router.post("/:id/expences", (req, res) => {
  const groupId = parseInt(req.params.id);
  const expences = req.body;
  const users = req.body.users;
  handleExpress(res, () => groupsService.addExpenceses(groupId, expences, users));
});
