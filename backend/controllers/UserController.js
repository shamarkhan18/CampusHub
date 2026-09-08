const User = require('../models/User');



async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { name, college, branch, graduationYear, bio } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, college, branch, graduationYear, bio },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: user.toSafeObject() });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, updateProfile };