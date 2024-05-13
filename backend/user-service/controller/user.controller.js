const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// const moment = require("moment");

// controllers.js
// const secretKey = 'user-key-086'; // Change this to a secure secret key

// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
// console.log('Generated secret key:', secretKey);

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // console.error('JWT verification error:', err);
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else {
        return res.status(500).json({ message: 'Internal server error' });
      }
    }
    req.user = decoded;
    next();
  });
};

// Function to generate JWT token
exports.generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Set expiration time to 1 hour
};

// Signup controller
exports.registerrUser = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
      // Check if user already exists
      let user = await User.findOne({ email });
  
      if (user) {
          return res.status(400).json({ success: false, message: 'User already exists' });
      }
  
      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt to hash the password
  
      // Create new user with hashed password
      user = new User({
          name,
          email,
          password,//: hashedPassword,// Store the hashed password in the database
          phone
      });
  
      await user.save();
  
      res.status(201).json({ success: true , message: 'User registered successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};

exports.registerrInstructor = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
      // Check if user already exists
      let user = await User.findOne({ email });
  
      if (user) {
          return res.status(400).json({ success: false, message: 'User already exists' });
      }
  
      // Hash the password
      // const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt to hash the password
  
      // Create new user with hashed password
      user = new User({
          name,
          email,
          password, //: hashedPassword,// Store the hashed password in the database
          phone,
          role: 'instructor',
          isInstructor: true
      });
  
      await user.save();
  
      res.status(201).json({ success: true , message: 'User registered successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
};



// Signin controller
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Validate Request
  if (!email || !password) {
    res.status(400);
    console.log("Please add email and password");
  }

  // Check if user exists
  const user = await User.findOne({ email });
  
  if (!user) {
    res.status(400);
    res.json("User not found, please signup");
  }

  // Check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  
  if (password=== user.password) {
    
  // Generate Token
  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1d' });
  
  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  // Modify the part in your loginUser function that sends the response
  if (user) {
    const { id, name, email, role, isDoctor } = user; // Include role here
    res.status(200).json({
      id,
      name,
      email,
      role, // Send role to the frontend
      isDoctor,
      token,
    });
  }

  } else {
    res.status(400);
    res.json("Invalid email or password");
  }
};




// Profile controller
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Retrieve user details using user ID from token
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); // Return user details
      } catch (error) {
        // console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server Error' });
      }
};

// // Update User
exports.updateUser = async (req, res) => {
    const user = await User.findById(req.user.id); 
  
    if (user) {
      const { name, email, photo, phone, bio ,role} = user;
      user.email = email;
      user.name = req.body.name || name;
      user.phone = req.body.phone || phone;
      user.bio = req.body.bio || bio;
      user.photo = req.body.photo || photo;
      if(req.user.role === 'admin') {
        user.role = req.body.role || user.role;
    }

      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        photo: updatedUser.photo,
        phone: updatedUser.phone,
        bio: updatedUser.bio,
      });
    } else {
      res.status(404);
      res.json("User not found");
    }
  };

//reset password

exports.changePassword = async (req, res) => {
  const user = await User.findById(req.user.id);
  const { oldPassword, password } = req.body;

  if (!user) {
    res.status(400);
    return res.status(400).json({ success: false, message: "User not found, please signup" });
  }

  // Validate
  if (!oldPassword || !password) {
    res.status(400);
    return res.status(400).json({ success: false, message: "Please add old and new password" });
  }

  // Check if old password matches password in DB
  // const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);

  // Save new password
  if (oldPassword=== user.password) {
    // Hash the new password
    // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Store the hashed password
    // user.password = hashedPassword;
      user.password = password;
    await user.save();
    return res.status(200).send("Password change successful");
  } else {
    res.status(400);
    return res.status(200).send("Old password is incorrect");
  }
};


// Logout User
exports.logout = async (req, res) => {
    res.cookie("token", "", {
      path: "/",
      httpOnly: true,
      expires: new Date(0),
      sameSite: "none",
      secure: true,
    });
    return res.status(200).json({ message: "Successfully Logged Out" });
};

//forget password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      res.status(404);
      res.json("User does not exist");
    }

    // Delete token if it exists in DB
    let token = await Token.findOne({ userId: user.id });
    if (token) {
      await token.deleteOne();
    }
  
    // Create Reset Token
    let resetToken = crypto.randomBytes(32).toString("hex") + user.id;
    console.log(resetToken);
    // Hash token before saving to DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
      //console.log(hashedToken);

    // Save Token to DB
    await new Token({
      userId: user.id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 40 * (60 * 1000), // fourty minutes
    }).save();
  
    // Construct Reset Url
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
  
    // Reset Email
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>  
        <p>This reset link is valid for only 40 minutes.</p>
  
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
  
        <p>Regards...</p>
        <p>edupanda Team</p>
      `;
    const subject = "Password Reset Request";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;
  
    try {
        const sent = await sendEmail(subject, message, send_to, sent_from);
        if(sent){
          res.status(200).json({ success: true, message: "Reset Email Sent" });
        }else{
          res.status(200).json({ success: false, message: "Email not Sent. error"});
        }
      } catch (error) {
        res.status(500);
        // res.json("Email not sent, please try again");
        res.status(200).json({ success: false, message: "Email not Sent. error" , error});
        console.log(error)
      }   
  };


//     // Reset Password
exports.resetPassword = async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;
  
    // Hash token, then compare to Token in DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // fIND tOKEN in DB
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });
  
    if (!userToken) {
      res.status(404);
      res.json("Invalid or Expired Token");
    }

    // Find user
    const user = await User.findOne({ _id: userToken.userId });
    user.password = password;
    await user.save();
    res.status(200).json({
      message: "Password Reset Successful, Please Login",
    });
  };







// // Get Login Status
// const loginStatus = asyncHandler(async (req, res) => {

//     const token = req.cookies.token;
//     if (!token) {
//       return res.json(false);
//     }
//     // Verify Token
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     if (verified) {
//       return res.json(true);
//     }
//     return res.json(false);
// });

// const getAllUsers = asyncHandler(async (req, res) => {
//   try {
//         // Fetch all users from the database without their passwords
//         const users = await User.find({}).select('-password');

//       // Send the users as a response
//       res.status(200).json(users);
//   } catch (error) {
//       // If an error occurs, send a 500 status code and the error message
//       res.status(500).json({ message: error.message });
//   }
// });













// module.exports = {
//     // registerUser,
//     // loginUser,
//     logout,
//     // getUser,
//     loginStatus,
//     getAllUsers,
//     updateUser,
//     changePassword,
//     forgotPassword,
//     resetPassword
// };