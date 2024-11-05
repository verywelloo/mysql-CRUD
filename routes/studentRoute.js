const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

//router express
const router = express.Router();

//routes
//GET ALL STUDENTS LIST || GET , CREATE STUDENT || POST
router.route("/").get(getStudents).post(createStudent);

//GET STUDENT BY ID || GET, UPDATE STUDENT || PUT, DELETE STUDENT || DELETE
router
  .route("/:id")
  .get(getStudentById)
  .patch(updateStudent)
  .delete(deleteStudent);

module.exports = router;
