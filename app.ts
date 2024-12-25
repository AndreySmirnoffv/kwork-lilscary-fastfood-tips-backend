import authRoutes from './src/routes/auth.routes';
import paymentRoutes from './src/routes/payment.routes';
import verifyRoutes from './src/routes/sms.routes'
import tokenAuthRoutes from './src/routes/auth.token.routes'
import avatarUploadsRoutes from './src/routes/avatar.routes'
import userRoutes from './src/routes/user.routes'

import {app} from './index'


app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/verify", verifyRoutes)
app.use('/api/token', tokenAuthRoutes)
app.use('/api/uploads', avatarUploadsRoutes)
app.use('/api/user', userRoutes)