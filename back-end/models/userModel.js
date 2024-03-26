const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "first name is required"],
      maxlength: 32,
    },

    email: {
      type: String,
      trim: true,
      required: [true, "e-mail is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      minlength: [6, "password must have at least (6) caracters"],
    },

    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

//encrypting password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10)
});

// compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  console.log(enteredPassword.password, 'password1111')
  console.log(this.password, 'password')
  //console.log(user.get('password'),'bcryotnnn')
  return  await bcrypt.compare(enteredPassword, this.password);
};

// return a JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

module.exports = mongoose.model("User", userSchema);
