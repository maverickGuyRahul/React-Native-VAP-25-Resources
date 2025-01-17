import express from 'express';
import mongoose from 'mongoose';
import { stringify } from 'flatted';

import User from './models/User.js';

const PORT = 3000;
const app = express();

mongoose
  .connect('mongodb://localhost:27017/userProfile', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected Successfully...'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// EJS Setup
app.set('view engine', 'ejs');

// Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST Request handler to store a new user
app.post('/users', async (req, res) => {
  try {
    const { rollNo, name, email, bio, age, dept } = req.body;
    const user = new User({ rollNo, name, email, bio, age, dept });
    await user.save();
    console.log('User created successfully:', user);
    res.status(201).json({ message: 'User Created Successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching users', error });
  }
});

app.put('/users/:rollNo', async (req, res) => {
  try {
    const { rollNo, name, email, bio, age, dept } = req.body;
    const requestParamRollNo = req.params.rollNo;

    console.log('Updating user with Roll No:', requestParamRollNo);
    console.log('Updated data:', { rollNo, name, email, bio, age, dept });

    const updatedData = { rollNo, name, email, bio, age, dept };

    const updatedUser = await User.findOneAndUpdate(
      { rollNo: requestParamRollNo },
      updatedData,
      {
        new: true, // Return the updated user
        runValidators: true, // Validate against the schema
      }
    );

    if (!updatedUser) {
      console.log('User with given Roll No not found');
      return res
        .status(404)
        .json({ message: 'User with given Roll No not found' });
    } else {
      console.log('User updated successfully:', updatedUser);
      return res.json({
        message: 'User updated successfully!',
        user: updatedUser,
      });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(400).json({ message: 'Error updating user', error });
  }
});

app.delete('/users/:rollNo', async (req, res) => {
  try {
    const requestParamRollNo = req.params.rollNo;

    console.log('Deleting user with Roll No:', requestParamRollNo);

    const deletedUser = await User.findOneAndDelete({
      rollNo: requestParamRollNo,
    });

    if (!deletedUser) {
      console.log('User with given Roll No not found');
      return res
        .status(404)
        .json({ message: 'User with given Roll No not found' });
    } else {
      console.log('User deleted successfully:', deletedUser);
      return res.json({
        message: 'User deleted successfully!',
        user: deletedUser,
      });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(400).json({ message: 'Error deleting user', error });
  }
});

// Fetch students belonging to a particular dept (non-case sensitive)
app.get('/users/dept', async (req, res) => {
  try {
    const dept = req.query.dept;

    if (!dept) {
      return res
        .status(400)
        .json({ message: 'Dept query parameter is required' });
    }

    const users = await User.find({ dept: { $regex: new RegExp(dept, 'i') } });
    return res.json(users);
  } catch (error) {
    console.error('Error fetching users by dept:', error);
    return res.status(400).json({ message: 'Error fetching users', error });
  }
});

// Fetch students above a specific age
app.get('/users/age', async (req, res) => {
  try {
    const age = parseInt(req.query.age, 10);

    if (isNaN(age)) {
      return res.status(400).json({ message: 'Invalid age parameter' });
    }

    const users = await User.find({ age: { $gt: age } });
    return res.json(JSON.parse(stringify(users)));
  } catch (error) {
    console.error('Error fetching users by age:', error);
    return res.status(400).json({ message: 'Error fetching users', error });
  }
});

// Server Switch on Prompt message....
app.listen(PORT, (req, res) => {
  console.log(`The server is up and running on Port Number: ${PORT}`);
});
