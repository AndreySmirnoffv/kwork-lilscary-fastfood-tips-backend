import { changePassword, changeUserData } from "../controllers/user.controller";
import { router } from "./router";

router.patch("change-userdata", changeUserData)
router.patch("change-userpassword", changePassword)

export default router