const cron = require('node-cron');
const Issue = require('../models/issue.model');

module.exports = (io) => {
  // Runs every 2 mins once 
  cron.schedule('*/2 * * * *', async () => {
    const now = new Date();
    // const overdueIssues = await Issue.find({
    //   dueDate: { $lt: now },
    //   status: { $ne: 'Closed' }
    // });
    const overdueIssues = await Issue.find({
  dueDate: { $lt: now },
//   status: { $ne: "Closed" || "Close" || "closed" || "close"}
   status: { $nin: ["Closed", "Close", "closed", "close" ]}
}).populate({
  path: 'project',
  populate: { path: 'organization' }
});

    // Emit notifications or handle reminders here
    // overdueIssues.forEach(issue => {
    //   io.to(issue.project.organization.toString()).emit('overdueReminder', {
    //     issueId: issue._id,
    //     title: issue.title,
    //     dueDate: issue.dueDate,
    //   });
    // });
    overdueIssues.forEach(issue => {
  const orgId = issue.project?.organization?._id?.toString();
  if (!orgId) return; // skip if no org to notify

  io.to(orgId).emit('overdueReminder', {
    issueId: issue._id,
    title: issue.title,
    dueDate: issue.dueDate,
  });
});


    console.log(`${overdueIssues.length} overdue issues reminded.`);
  });
};
