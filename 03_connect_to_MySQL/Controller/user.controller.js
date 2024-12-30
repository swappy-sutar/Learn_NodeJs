import DB from "../Config/Db.config.js";

const getUser = async (req, res) => {
  try {
    const [data] = await DB.query("SELECT * FROM users");

    if (!data.length) {
      return res.status(404).json({
        success: false,
        message: "No records found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User ID is required",
      });
    }

    const [userDetails] = await DB.query(
      "SELECT * FROM users WHERE userId = ?",
      [userId]
    );

    if (!userDetails.length) {
      return res.status(404).json({
        success: false,
        message: "No user found with the given ID",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetails[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Validate input fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (firstname, lastname, email, password) are required",
      });
    }

    // Check if the email already exists
    const [userExists] = await DB.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (userExists.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const [result] = await DB.query(
      `INSERT INTO users (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`,
      [firstname, lastname, email, password]
    );

    if (result.affectedRows === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to create user",
      });
    }

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        id: result.insertId,
        firstname,
        lastname,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error creating user",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const { firstname, lastname, email, password } = req.body;

    if (!firstname && !lastname && !email && !password) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (firstname, lastname, email, password) is required for update",
      });
    }

    const [result] = await DB.query(
      `UPDATE users 
       SET 
         firstname = COALESCE(?, firstname),
         lastname = COALESCE(?, lastname),
         email = COALESCE(?, email),
         password = COALESCE(?, password)
       WHERE userId = ?`,
      [
        firstname || null,
        lastname || null,
        email || null,
        password || null,
        userId,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({
        success: false,
        message: "Failed to update user or no changes were made",
      });
    }

    const [updatedUser] = await DB.query(
      "SELECT * FROM users WHERE userId = ?",
      [userId]
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error updating user",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate user ID
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    // Execute the DELETE query and await the result
    const [result] = await DB.query(`DELETE FROM users WHERE userId = ?`, [userId]);

    // Check if a row was affected
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found or already deleted",
      });
    }

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};


export { getUser, getUserById, createUser, updateUser, deleteUser };
