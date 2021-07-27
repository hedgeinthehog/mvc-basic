const Students = require("../models/Students");

// this will called when url === "/students"
// function StudentsController(req, res) {
//   const { studentId } = req.params;
//   if (studentId) {
//     const student = Students.getById(studentId);
//     if (!student) {
//       res.render("pages/error");
//     } else {
//       res.render("pages/student", { student });
//     }
//   } else {
//     const students = Students.getAll();
//     res.render("pages/students", { students });
//   }
// }

class StudentsController {
    // used for students list and individual student page
  main(req, res) {
    const { studentId } = req.params;
    if (studentId) {
      const student = Students.getById(studentId);
      if (!student) {
        res.render("pages/error");
      } else {
        res.render("pages/student", { student });
      }
    } else {
      const students = Students.getAll();
      res.render("pages/students", { students });
    }
  }
  // used for rendering create student form
  renderForm(req, res) {
      res.render("pages/addStudent");
  }
  // used for POST request from the form, and adding new student
  createStudent(req, res) {
    console.log(req.body);
    
    Students.createStudent(req.body);

    // return the same form
    res.render("pages/addStudent");
  }
}

module.exports = StudentsController;
