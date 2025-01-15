import { uploadAvatar } from '../controllers/uploads.controller.js';
import { router } from './router.js';
router.patch("/upload-avatar", uploadAvatar);
export default router;
