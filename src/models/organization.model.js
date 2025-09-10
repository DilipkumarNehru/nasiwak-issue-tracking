'use strict';
const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);
