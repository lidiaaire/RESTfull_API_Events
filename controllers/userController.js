const bcrypt = require("bcrypt");
const User = require("../models/userModels");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      createDate: new Date(),
    });

    await user.save();

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        status: "error",
        message: "Email already exists",
      });
    }

    res.status(400).json({
      status: "error",
      message: "User not created",
      error: error.message,
    });
  }
};

module.exports = { createUser };
