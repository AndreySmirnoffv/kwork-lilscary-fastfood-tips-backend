import { uploadAvatar } from '../controllers/uploads.controller'
import {router} from './router'

router.patch("/upload-avatar", uploadAvatar)

export default router