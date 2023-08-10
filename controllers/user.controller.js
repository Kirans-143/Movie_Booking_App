const Users = require("./../models/users.model");

const getAllUsers = async (req, res) => {
  try {
    let allUsers = await Users.find();
    if (allUsers) {
      let users = [];
      allUsers.forEach((user) => {
        users.push({
          name: user.name,
          email: user.email,
          userType: user.userType,
          userStatus: user.userStatus,
          userId: user.userId,
        });
      });
      res.send(users).status(200);
    }
  } catch (error) {
    res
      .send("error occured in getAllUsers Data..." + error.message)
      .status(500);
  }
};

const getUserById = async (req, res) => {
  const entereduserId = req.params.userId;

  try {
    if (!entereduserId) {
      res.send("Please enter a valid userId for getUserDetails...").status(400);
    } else if (entereduserId) {
      let foundUser = await Users.findOne({ userId: entereduserId });

      if (foundUser) {
        res
          .send({
            name: foundUser.name,
            email: foundUser.email,
            userType: foundUser.userType,
            userStatus: foundUser.userStatus,
          })
          .status(200);
      }
    }
  } catch (error) {
    res.send("error occured in getUserById..." + error.message).status(500);
  }
};

const updateUseerDetails = async (req, res) => {
  const enteredUserId = req.params.userId;

  try {
    if (enteredUserId) {
      let foundUser = await Users.find({ userId: enteredUserId });

      if (foundUser) {
        foundUser.name =
          req.body.name != undefined ? req.body.name : foundUser.name;
        foundUser.userType =
          req.body.name != undefined ? req.body.userType : foundUser.userType;
        foundUser.userStatus =
          req.body.userStatus != undefined
            ? req.body.userStatus
            : foundUser.userStatus;
        foundUser.email =
          req.body.email != undefined ? req.body.email : foundUser.email;

        let updatedUserData = await foundUser.save();
        res
          .send("userDetails updated Successfully..." + updatedUserData)
          .status(200);
      } else if (!foundUser) {
        res.send("No User found against entered userId...").status(400);
        return;
      }
    } else if (!enteredUserId) {
      res
        .send("Please provide a valid userId for update user Details...")
        .status(400);
    }
  } catch (error) {
    res
      .send("error occured while updating user Details..." + error.message)
      .status(500);
  }
};

const deleteUser = async (req, res) => {
  const enteredUserId = req.params.userId;

  try {
    if (enteredUserId) {
      let foundUser = await Users.findByIdAndDelete({ userId: enteredUserId });

      if (foundUser) {
        res
          .send("One Of UserData has been successfully removed...")
          .status(200);
      }
    } else {
      res
        .send("Please enter a userId for successfully remove userData...")
        .status(400);
    }
  } catch (error) {
    res.send("error occured while removing userData..." + error.message);
  }
};

module.exports = { getAllUsers, getUserById, updateUseerDetails, deleteUser };
