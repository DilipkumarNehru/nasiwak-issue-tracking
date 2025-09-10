const cron = require('node-cron');
const Issue = require('../models/issue.model');

module.exports = (io) => {
  // Runs every hour
  cron.schedule('0 * * * *', async () => {
    const now = new Date();
    const overdueIssues = await Issue.find({
      dueDate: { $lt: now },
      status: { $ne: 'Closed' }
    });

    // Emit notifications or handle reminders here
    overdueIssues.forEach(issue => {
      io.to(issue.project.organization.toString()).emit('overdueReminder', {
        issueId: issue._id,
        title: issue.title,
        dueDate: issue.dueDate,
      });
    });

    console.log(`${overdueIssues.length} overdue issues reminded.`);
  });
};
