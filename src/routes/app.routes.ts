import authRoutes from './auth.routes';
import paymentRoutes from './payment.routes';
import verifyRoutes from './sms.routes'
import tokenAuthRoutes from './auth.token.routes'
import avatarUploadsRoutes from './avatar.routes'
import userRoutes from './user.routes.js'
import router from './auth.routes.js';

router.use("/auth", authRoutes);
router.use("/payments", paymentRoutes);
router.use("/verify", verifyRoutes)
router.use('/token', tokenAuthRoutes)
router.use('/uploads', avatarUploadsRoutes)
router.use('/user', userRoutes)

export default router