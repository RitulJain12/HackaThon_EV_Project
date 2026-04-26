  const User = require('../models/user.model');
  const bcrypt = require('bcryptjs');
  const jwt = require('jsonwebtoken');
const {JWT_KEY}=require('../config/config');

  const registerUser = async (req, res) => {
     // console.log(req);
    const { name, email, password, role } = req.body;

    const user= await User.findOne({email});
    console.log(user);
    if(user){ return res.status(400).json({
      success: false,
      message: "User already exists",
    });}

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      
      const token = jwt.sign({ id: user._id, role: user.role },JWT_KEY, {
        expiresIn: '1d',
      });

      res.cookie('token', token, { httpOnly: true });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


  const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
           
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_KEY, {
          expiresIn: '1d',
        });

        res.cookie('token', token, { httpOnly: true });
        const userdet={
          name:user.name,
          email,
          id:user._id,
          role:user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }

      res.json(userdet);
    } catch (error) {
      res.status(400).json({ error: error.message });
    } 
  };

  module.exports = {
    registerUser,
    loginUser,
  };