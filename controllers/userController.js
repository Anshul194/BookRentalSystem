// controllers/userController.js
import { addUser, getAllUsers } from '../services/userService.js';

// Add a new user
const createUser = async (req, res) => {
  try {
    const user = await addUser(req.body);
    res.status(201).json({message:'user created successfully',
        user,
        success:true
    });
  } catch (error) {

    res.status(500).json({ message: error.message ,success:false});
  }
};

// Fetch all users
const fetchAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({message:'users list fetched successfully',users,success:true});
  } catch (error) {
    res.status(500).json({ message: error.message,success:false });
  }
};

export { createUser, fetchAllUsers };
