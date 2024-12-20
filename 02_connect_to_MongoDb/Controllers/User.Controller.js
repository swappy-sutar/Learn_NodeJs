import { User } from "../Models/User.Model.js";
// import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  try {
    const { name, email, mobile, age, work, address, salary, password } = req.body;

    console.log("Incoming request body:", req.body);

    if (
      !name ||
      !email ||
      !mobile ||
      !work ||
      !address ||
      !salary ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const createuser = await User.create({
      name: name,
      email: email,
      mobile: mobile,
      work: work,
      age: age,
      address: address,
      salary: salary,
      password: password,
    });

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: createuser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createUser };
