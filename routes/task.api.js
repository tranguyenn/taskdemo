const express = require("express");
const {
  getAllTasks,
  addReference,
  getTaskById,
  createTask,
  deleteTaskById,
  updateTask,
} = require("../controllers/task.controller");
const validators = require("../middlewares/validators");
const validateId = require("../middlewares/validateId");
const validateUser = require("../middlewares/validateUser");
const { param, body } = require('express-validator');
const validateTask = require("../middlewares/validateTask");


const router = express.Router();

/**
 * @route GET api/tasks/:id
 * @description Get task by id
 * @access public
 */
router.get("/:id",validators.validate(validateId), getTaskById);

/**
 * @route GET api/tasks
 * @description Get all
 * @access public
 * @query : name,status,createAt,updateAt
 */
router.get("/", getAllTasks);

/**
 * @route POST api/tasks
 * @description Create a task
 * @access private, manager
 * @requiredBody: name,description
 */
router.post("/",validators.validate(validateTask), createTask);

/**
 * @route PUT api/tasks/assignee
 * @description update assignee to a task
 * @access private manager
 * @requires: taskId,empId
 */
router.put("/assignee", addReference);

/**
 * @route PUT api/tasks/detail
 * @description update status/description to a task
 * @access private manager
 */
router.put("/updates/:id",validators.validate(validateId),updateTask);

//Delete
/**
 * @route DELETE api/tasks
 * @description delete a task
 * @access public
 */
router.delete("/:id",validators.validate(validateId), deleteTaskById);
//export
module.exports = router;
//Update
