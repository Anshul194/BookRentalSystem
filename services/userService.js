// services/userService.js
import User from '../models/user.js';

// Add a new user
const addUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (error) {
    throw new Error('Error adding user: ' + error.message);
  }
};

// Fetch all users
const getAllUsers = async () => {
  try {
    return await User.find({});
  } catch (error) {
    throw new Error('Error fetching users: ' + error.message);
  }
};

export { addUser, getAllUsers };
