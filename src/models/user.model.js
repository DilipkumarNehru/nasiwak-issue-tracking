'use strict';
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },//unique: true 
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Owner', 'Manager', 'Member'], default: 'Member' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
