// 'use strict';
// require('dotenv').config();
// const express = require('express');
// const db = require('./src/config/database');
// const userRoutes = require('./src/routes/user.router');
// const projectRoutes = require('./src/routes/project.router');
// const issueRoutes = require('./src/routes/issue.router');

// const app = express();
// app.use(express.json());

// app.use('/api/users', userRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/issues', issueRoutes);

// // Global error handler middleware could be added here

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

'use strict';
require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const db = require('./src/config/database');

const userRoutes = require('./src/routes/user.router');
const projectRoutes = require('./src/routes/project.router');
const issueRoutes = require('./src/routes/issue.router');
const notificationSocket = require('./src/sockets/notificationSocket');
const organizationRoutes = require('./src/routes/organization.router');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  }
});

app.use(express.json());
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Inject socket io instance to global or request for notification controller
app.set('io', io);

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/organizations', organizationRoutes);

// Socket event handlers (namespacing can be added for multi-organization separation)
notificationSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const overdueReminder = require('./src/worker/overdueReminder');
overdueReminder(io);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
