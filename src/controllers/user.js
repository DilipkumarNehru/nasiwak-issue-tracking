'use strict';
const User = require('../models/user.model');
const api = require('../helpers/api');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {

//   async register(req, res) {
//     try {
//       const { userName, email, password, role, organization } = req.body;

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const user = new User({ userName, email, password: hashedPassword, role, organization });
//       await user.save();

//       api.ok(res, { id: user._id, userName: user.userName, email: user.email }, 'User registered');
//     } catch (err) {
//       api.serverError(res, err.message || 'User registration failed');
//     }
//   }

async register(req, res) {
  try {
    const users = req.body; // An array of user objects
    if (!Array.isArray(users)) {
      return api.badRequest(res, 'Expected an array of users');
    }

    const savedUsers = [];
    for (const userData of users) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = new User({ ...userData, password: hashedPassword });
      const savedUser = await user.save();
      savedUsers.push(savedUser);
    }
    api.ok(res, savedUsers, 'Users registered');
  } catch (err) {
    api.serverError(res, err.message);
  }
}

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return api.unauthorized(res, 'Invalid email or password');
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return api.unauthorized(res, 'Invalid email or password');
      }

      const token = jwt.sign(
        { id: user._id, userName: user.userName, role: user.role, organization: user.organization },
        process.env.JWT_SECRET,
        { expiresIn: '4h' }
      );

      api.ok(res, { token }, 'Login successful');
    } catch (err) {
      api.serverError(res, err.message || 'Login failed');
    }
  }

  async getProfile(req, res) {
  try {
    // req.user is set by checkJWT middleware from the decoded token
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');  // exclude password

    if (!user) {
      return res.status(404).json({ status: 404, message: 'User not found', data: null });
    }

    return res.status(200).json({ status: 200, message: 'Success', data: user });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Server error', data: null });
  }
}

}

module.exports = new UserController();
