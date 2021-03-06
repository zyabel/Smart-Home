const checkAuth = require('../middleware/checkAuth.js');
const userRoutes = require('./users.js');
const notificationRoutes = require('./notifications.js');
const devicesRoutes = require('./devices.js');
const registerRouter = require('./register.js');
const loginRouter = require('./login.js');
const logoutRouter = require('./logout.js');
const locationRouter = require('./locations.js');

module.exports = (router) => {
  router.use('/users', checkAuth, userRoutes);
  router.use('/notifications', checkAuth, notificationRoutes);
  router.use('/devices', checkAuth, devicesRoutes);
  router.use('/logout', checkAuth, logoutRouter);
  router.use('/register', registerRouter);
  router.use('/login', loginRouter);
  router.use('/location', locationRouter);
};
