'use strict';
const Project = require('../models/project.model');
const api = require('../helpers/api');

class ProjectController {
  async createProject(req, res) {
    try {
      const { name, description } = req.body;
      const organization = req.user.organization;

      const project = new Project({ name, description, organization });
      await project.save();

      api.ok(res, project, 'Project created');
    } catch (err) {
      api.serverError(res, err.message || 'Project creation failed');
    }
  }

  async listProjects(req, res) {
    try {
      const organization = req.user.organization;
    //   const organization = req.user.organization;

const project = await Project.findOne({organization });
if (!project) {
  return api.notFound(res, 'Project not found or not accessible');
}

      const projects = await Project.find({ organization });
      api.ok(res, projects, 'Projects fetched');
    } catch (err) {
      api.serverError(res, err.message || 'Failed to fetch projects');
    }
  }
}

module.exports = new ProjectController();
