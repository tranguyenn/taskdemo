const { sendResponse, AppError } = require("../helpers/utils.js");

const User = require("../models/User.js");
const Task = require("../models/Task.js");

const userController = {};
//create
userController.createUser = async (req, res, next) => {
  //in real project you will getting info from req

  try {
    const { name } = req.body;
    if (!name) throw new AppError(402, "Bad Request", "Missing data Error");
    const info = {
      name: name,
      "role": "employee"
    };
    //always remember to control your inputs
    //mongoose query
    const created = await User.create(info);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create user Success"
    );
  } catch (err) {
    next(err);
  }
};
//get by id
userController.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError(402, "Bad Request", "Missing id Error");
    const userFound = await User.findById(id);
    sendResponse(
      res,
      200,
      true,
      { data: userFound },
      null,
      "Find user Success"
    );
  } catch (err) {
    next(err);
  }
};
//get user by filter
userController.getUserByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) throw new AppError(402, "Bad Request", "Missing name Error");
    const userFound = await User.find({ name: name, role: "employee" });
    sendResponse(
      res,
      200,
      true,
      { data: userFound },
      null,
      "Find user by name Success"
    );
  } catch (err) {
    next(err);
  }
};

//get user by filter
userController.getUserByFilter = async (req, res, next) => {
    try {
        const { name } = req.query;
        let filter = {};
        if (name) filter = { name: { $regex: ".*" + name + ".*" } };
        console.log(name)
        const usersFound = await User.find(filter);
        sendResponse(
          res,
          200,
          true,
          { data: usersFound },
          null,
          "Find user by filter Success"
        );
    } catch (err) {
        next(err);
    }
 
};
//get user task
userController.getUserTask = async (req, res, next) => {
    try {
    const { id } = req.params;
    if (!id) throw new AppError(402, "Bad Request", "Missing user id Error");
    const userFound = await User.findById(id);
    if(!userFound){
        throw new AppError(404, "Not Found", "User not found");
    }
  
    // console.log(userFound._id)
    const userTasks = await Task.find({ referenceTo: userFound._id });
    sendResponse(
        res,
        200,
        true,
        { data: userTasks },
        null,
        "Find user task Success"
      );
    } catch (err) {
        next(err)
    }
};
//export
module.exports = userController;
