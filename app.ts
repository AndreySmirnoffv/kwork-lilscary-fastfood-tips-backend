import authRoutes from './src/routes/auth.routes';
import paymentRoutes from './src/routes/payment.routes';
import verifyRoutes from './src/routes/sms.routes'
import tokenAuthRoutes from './src/routes/auth.token.routes'
import avatarUploadsRoutes from './src/routes/avatar.routes'
import router from './src/routes/auth.routes';


router.use("/api/auth", authRoutes);
router.use("/api/payments", paymentRoutes);
router.use("/api/verify", verifyRoutes)
router.use('/api/token', tokenAuthRoutes)
router.use('/api/uploads', avatarUploadsRoutes)