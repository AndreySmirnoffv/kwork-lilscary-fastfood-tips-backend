import { csrfProtection } from '../..'
import { uploadAvatar } from '../controllers/uploads.controller'
import {router} from './router'

router.patch("/upload-avatar", csrfProtection, uploadAvatar)

export default router