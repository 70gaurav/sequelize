import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import logger from '../logger/logger.js';

const router = express.Router();

export const signup = async (req, res) => {
  const { userName, userEmail, contactNumber, password } = req.body;
  console.log(req.body);
  try {
    const existingUser = await User.findOne({
      where: {
        userEmail: userEmail,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      userName,
      userEmail,
      contactNumber,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully' });
    logger.info({message : "user created successfully"});
  } catch (error) {
    // console.error('Error inserting user:', error);
    logger.error("error inserting user :" , error )
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  const { userEmail, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        userEmail: userEmail,
      },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, 'secret_key');
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error selecting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

router.post('/signup', signup);
router.post('/login', login);

export default router;
