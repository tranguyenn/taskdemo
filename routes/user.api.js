const express= require("express")
const { createUser, getUserById, getUserTask, getUserByFilter, getUserByName } = require("../controllers/user.controller")
const router = express.Router()

/**
 * @route GET api/users/search
 * @description Get a list of users
 * @access private
 * @allowedQueries: name
 */
router.get("/search",getUserByName)


/**
 * @route GET api/users/:id
 * @description Get user by id
 * @access public
 */
router.get("/:id",getUserById)

/**
 * @route GET api/users/filter
 * @description Get list user that name alike
 * @access public
 */
router.get("/",getUserByFilter)

/**
 * @route GET api/users/:id/tasks
 * @description Get all task by userId
 * @access public
 */
router.get("/:id/tasks",getUserTask)


/**
 * @route POST api/users
 * @description Create a new user
 * @access private, manager, employee
 * @requiredBody: name 
 */
router.post("/",createUser)

//export
module.exports= router
//Update