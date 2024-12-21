import { authenticateJwt } from '../middleware/auth.middleware'
import {router} from './router'

router.post("/auth-token", authenticateJwt)

export default router