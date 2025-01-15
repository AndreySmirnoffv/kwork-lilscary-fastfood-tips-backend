import { changePassword, changeUserData, getUser } from "../controllers/user.controller.js";
import { router } from "./router.js";
router.patch("/change-userdata", changeUserData);
router.patch("/change-userpassword", changePassword);
router.post("/get-user", getUser);
export default router;
