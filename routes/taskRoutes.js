const express = require("express");
const authMiddleware = require("../middleware/authmiddleware"); 
const { getTasks, createTask, updateTask, deleteTask } = require("../controller/taskController");

const router = express.Router();

router.get("/", authMiddleware,getTasks );
router.post("/", authMiddleware,createTask );
router.put("/:id", authMiddleware,updateTask );
router.delete("/:id", authMiddleware,deleteTask );

module.exports = router;
