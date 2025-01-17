import { csrfProtection } from "../..";
import { changePassword, changeUserData, getUser } from "../controllers/user.controller";
import { router } from "./router";

router.patch("/change-userdata", csrfProtection, changeUserData)
router.patch("/change-userpassword", csrfProtection, changePassword)
router.get("/get-user", csrfProtection, getUser)

export default router