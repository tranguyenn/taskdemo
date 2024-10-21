const express = require("express");
const {
  getAllTasks,
  addReference,
  getTaskById,
  createTask,
  deleteTaskById,
  updateTask,
} = require("../controllers/task.controller");
const router = express.Router();

/**
 * @route GET api/tasks/:id
 * @description Get task by id
 * @access public
 */
router.get("/:id", getTaskById);

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
router.post("/", createTask);

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
router.put("/updates/:id",updateTask);

//Delete
/**
 * @route DELETE api/tasks
 * @description delete a task
 * @access public
 */
router.delete("/:id", deleteTaskById);
//export
module.exports = router;
//Update
