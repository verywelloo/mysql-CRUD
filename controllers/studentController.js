const mySqlPool = require("../config/db");

// GET ALL STUDENTS LIST
const getStudents = async (req, res) => {
  try {
    const students = await mySqlPool.query("SELECT * FROM students");
    if (!students) {
      return res.status(404).send({
        success: false,
        message: "No Records found",
      });
    }

    res.status(200).send({
      success: true,
      message: "All Students Recode",
      totalStudent: students[0].length,
      students: students[0],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get All Student API",
      error,
    });
  }
};

//GET STUDENT BY ID
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid Or Provide Student id",
      });
    }
    //const data = await mySqlPool.query(`SELECT * FROM students WHERE id=`+studentId)
    const student = await mySqlPool.query(`SELECT * FROM students WHERE id=?`, [
      studentId,
    ]);
    if (!student) {
      return res.status(404).send({
        success: false,
        message: "No Records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All Students Recode",
      studentDetails: student[0],
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Get student by id API",
      error,
    });
  }
};

// CREATE STUDENT
const createStudent = async (req, res) => {
  try {
    const { name, roll_no, class_no, medium, fees } = req.body;
    if (!name || !roll_no || !class_no || !medium || !fees) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const student = await mySqlPool.query(
      `INSERT INTO students ( name, roll_no, class_no, medium, fees) VALUES (?, ? ,?,?,?)`,
      [name, roll_no, class_no, medium, fees]
    );
    if (!student) {
      return res.status(404).send({
        success: false,
        message: "Error In INSERT QUERY",
      });
    }
    res.status(201).send({
      success: true,
      message: "New Student Record Created",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Create Student API",
      error,
    });
  }
};

//UPDATE STUDENT
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Invalid ID or provide id",
      });
    }

    const { name, roll_no, class_no, fees, medium } = req.body;

    if (!name || !roll_no || !class_no || !fees || !medium) {
      return res.status(400).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    const student = await mySqlPool.query(
      `UPDATE students SET name = ?, roll_no = ?, class_no = ?, fees = ?, medium = ? WHERE id = ?`,
      [name, roll_no, class_no, fees, medium, studentId]
    );

    if (!student) {
      return res.status(500).send({
        success: false,
        message: "Error In UPDATE Data",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student Details Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update Student API",
      error,
    });
  }
};

//DELETE STUDENT
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(400).send({
        success: false,
        message: "Please Provide Student Id or Valid Student Id",
      });
    }

    await mySqlPool.query("DELETE FROM students WHERE id = ?", [studentId]);

    res.status(200).send({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Delete Student API",
      error,
    });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
