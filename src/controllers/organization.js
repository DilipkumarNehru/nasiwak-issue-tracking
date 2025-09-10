const Organization = require('../models/organization.model');
const api = require('../helpers/api');

class OrganizationController {
  async createOrganization(req, res) {
    try {
      const { name, description } = req.body;
      const org = new Organization({ name, description });
      await org.save();
      api.ok(res, org, 'Organization created');
    } catch (error) {
      api.serverError(res, error.message);
    }
  }

  async listOrganizations(req, res) {
    try {
      const orgs = await Organization.find();
      api.ok(res, orgs, 'Organizations fetched');
    } catch (error) {
      api.serverError(res, error.message);
    }
  }
}

module.exports = new OrganizationController();
