const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// POST /api/user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({
        message: 'User already exists'
    })
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = await User.create({
    name,
    email,
    address,
    password: hashedPassword,
    isAdmin: false,
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Please check data and try again!')
  }
})

// POST /api/user/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if(!email || !password){
      res.status(400).json({
          message: 'Email and password are required to login'
      })
  }
  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({
        message: 'Invalid email or password'
    })
  }
})

// GET /api/user/:id
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})


// PATCH /api/user/:id
const updateUser = asyncHandler(async (req,res) => {
    const { name, email, password, isAdmin, address } = req.body
    const id = req.params.id;
    

    //get user by id
    const user = await User.findOne({id});
    if(!user){
        res.status(400).json({
            message: `user with id ${id} does not exist`
        })
    }else{
      
      // set new user data
      user.name = name ? name : user.name;
      user.email = email ? email : user.email;
      user.password = password ? await hashPassword(password) : user.password;
      user.name = name ? name : user.name;
      user.isAdmin = isAdmin ? isAdmin : user.isAdmin;
      user.address = address ? address : user.address;
  
      //update user 
      const updatedUser = (await user.save())._doc;
  
      //checks if the user was updated
      if(updatedUser){
          res.status(200).json({
              _id: id,
              name: user.name,
              email: updatedUser.email,
              address: updatedUser.address,
              isAdmin: updatedUser.isAdmin,
          })
  
      }else{
          res.status(400).json({
              message : 'Please check data and try again!'
          })
      }

    }
})


// DELETE /api/user/:id
const deleteUser = asyncHandler( async (req,res) => {
    const id = req.params.id;
    const user = await User.findOne({id})
    
    if(!user){
        res.status(400).json({
            message: `user with id ${id} does not exist`
        })
    }

    else{

      if(user.isAdmin === true){
          res.status(400).json({
              message: 'Cannot delete an admin'
          })
          return;
      }else{
        
        const result = await User.deleteOne({id})
        if(result){
            res.status(200).json({
                message: `user with id ${id} has been deleted`
            })
        }else{
            res.status(400).json({
                message: 'Something went wrong try again!',
            })
        }
      }
    }




})

// GET /user
const getManagers = asyncHandler( async (req,res) => {
    const managers = await User.find({isAdmin:false});
    res.status(200).json(
        managers
    )
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


// Hash password

const hashPassword = asyncHandler(async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hash(password, salt)
    return hashedPassword
})

module.exports = {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  getManagers,
}