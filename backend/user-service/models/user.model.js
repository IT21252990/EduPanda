const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please add a name"],
      },
      email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid email",
        ],
      },
      password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"],
        //   maxLength: [23, "Password must not be more than 23 characters"],
      },
      // In your user model definition, add a role field
      role: {
        type: String,
        required: true,
        enum: ['admin', 'learner', 'instructor'], // This restricts the values to either 'admin' or 'user'
        default: 'learner' // Default to 'user' if not specified
      },
      photo: {
        type: String,
        // required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png",
      },
      phone: {
        type: String,
        // default: "+94 ",
        required: [true, "Please add a phone number"],
      },
      bio: {  
        type: String,
        maxLength: [550, "Bio must not be more than 250 characters"],
        default: "bio",
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      isInstructor: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
    
)

// //   Encrypt password before saving to DB
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   // Hash password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(this.password, salt);
//   this.password = hashedPassword;
//   next();
// });


const User = mongoose.model("User", userSchema);
module.exports = User;