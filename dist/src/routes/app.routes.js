import authRoutes from './auth.routes.js';
import paymentRoutes from './payment.routes.js';
import verifyRoutes from './sms.routes.js';
import avatarUploadsRoutes from './avatar.routes.js';
import userRoutes from './user.routes.js';
import router from './auth.routes.js';
router.use("/auth", authRoutes);
router.use("/payments", paymentRoutes);
router.use("/verify", verifyRoutes);
router.use('/uploads', avatarUploadsRoutes);
router.use('/user', userRoutes);
export default router;