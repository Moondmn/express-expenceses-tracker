import { Router } from "express";
import { userService } from "~/dependencies";
import { userAuthDto } from "~/modules/users/dto/user-auth.dto";
import { handleExpress } from "~/utils/expressHandler";

export const router = Router();

router.post("/ali", (req, res) => {
  const dto = userAuthDto.parse(req.body);
  handleExpress(res, () => userService.signUp(dto));
});
