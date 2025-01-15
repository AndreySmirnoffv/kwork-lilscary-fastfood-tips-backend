import { changePassword, changeUserData, getUser } from "../controllers/user.controller";
import { router } from "./router";
router.patch("/change-userdata", changeUserData);
router.patch("/change-userpassword", changePassword);
router.post("/get-user", getUser);
export default router;
