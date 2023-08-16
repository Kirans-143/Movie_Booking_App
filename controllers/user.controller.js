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
      res.status(200).send(users);
    }
  } catch (error) {
    res
      .status(500)
      .send("error occured in getAllUsers Data..." + error.message);
  }
};

const getUserById = async (req, res) => {
  const entereduserId = req.params.userId;

  try {
    if (!entereduserId) {
      res.status(400).send("Please enter a valid userId for getUserDetails...");
    } else if (entereduserId) {
      let foundUser = await Users.findOne({ userId: entereduserId });

      if (foundUser) {
        res.status(200).send({
          name: foundUser.name,
          email: foundUser.email,
          userType: foundUser.userType,
          userStatus: foundUser.userStatus,
        });
      }
    }
  } catch (error) {
    res.status(500).send("error occured in getUserById..." + error.message);
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
          .status(200)
          .send("userDetails updated Successfully..." + updatedUserData);
      } else if (!foundUser) {
        res.status(400).send("No User found against entered userId...");
        return;
      }
    } else if (!enteredUserId) {
      res
        .status(400)
        .send("Please provide a valid userId for update user Details...");
    }
  } catch (error) {
    res
      .status(500)
      .send("error occured while updating user Details..." + error.message);
  }
};

const deleteUser = async (req, res) => {
  const enteredUserId = req.params.userId;

  try {
    if (enteredUserId) {
      let foundUser = await Users.findByIdAndDelete({ userId: enteredUserId });

      if (foundUser) {
        res
          .status(200)
          .send("One Of UserData has been successfully removed...");
      }
    } else {
      res
        .status(400)
        .send("Please enter a userId for successfully remove userData...");
    }
  } catch (error) {
    res
      .status(204)
      .send("error occured while removing userData..." + error.message);
  }
};

module.exports = { getAllUsers, getUserById, updateUseerDetails, deleteUser };
