import authRoutes from './src/routes/auth.routes';
import paymentRoutes from './src/routes/payment.routes';
import verifyRoutes from './src/routes/sms.routes'
import avatarUploadsRoutes from './src/routes/avatar.routes'
import userRoutes from './src/routes/user.routes'
import router from './src/routes/auth.routes';


router.use("/api/auth", authRoutes);
router.use("/api/payments", paymentRoutes);
router.use("/api/verify", verifyRoutes)
router.use('/api/uploads', avatarUploadsRoutes)
router.use('/api/users', userRoutes)