module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join rooms per organization for scoped notifications
    socket.on('joinOrganization', (orgId) => {
      socket.join(orgId);
      console.log(`Socket ${socket.id} joined org ${orgId}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
