'use strict';
const Issue = require('../models/issue.model');
const api = require('../helpers/api');

class IssueController {
  async createIssue(req, res) {
    try {
      const { title, description, status, priority, dueDate, assignedTo, project } = req.body;
      const issue = new Issue({ title, description, status, priority, dueDate, assignedTo, project });
      await issue.save();
      const io = req.app.get('io');
io.to(req.user.organization.toString()).emit('issueUpdated', {
  issueId: issue._id,
  title: issue.title,
  status: issue.status,
  updatedAt: new Date(),
});

      api.ok(res, issue, 'Issue created');
    } catch (err) {
      api.serverError(res, err.message || 'Issue creation failed');
    }
  }

  async listIssues(req, res) {
    try {
      const { status, priority, dueDate, page = 1, limit = 10 } = req.query;
      const query = {};

      if (status) query.status = status;
      if (priority) query.priority = priority;
      if (dueDate) query.dueDate = { $lte: new Date(dueDate) };

      const issues = await Issue.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .populate('assignedTo', 'userName email')
        .populate('project', 'name');

      api.ok(res, issues, 'Issues fetched');
    } catch (err) {
      api.serverError(res, err.message || 'Failed to fetch issues');
    }
  }

  async uploadAttachment(req, res) {
  try {
    const { issueId } = req.params;
    if (!req.files || !req.files.attachment) {
      return api.badRequest(res, 'No file uploaded');
    }

    const file = req.files.attachment;
    const uploadPath = __dirname + `/../../uploads/${file.name}`;

    await file.mv(uploadPath);

    // Save path in Issue attachments array
    const issue = await Issue.findById(issueId);
    issue.attachments.push(file.name);
    await issue.save();

    api.ok(res, { fileName: file.name }, 'File uploaded');
  } catch (err) {
    api.serverError(res, err.message);
  }
}

}

module.exports = new IssueController();
