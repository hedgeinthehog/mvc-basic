const StudentsRepository = require("../repositories/StudentsRepository");

class StudentsController {
    // used for students list and individual student page
  main(req, res) {
    const { studentId } = req.params;
    if (studentId) {
      const student = StudentsRepository.getById(studentId);
      if (!student) {
        res.render("pages/error");
      } else {
        res.render("pages/studentForm", { student });
      }
    } else {
      const students = StudentsRepository.getAll();
      res.render("pages/students", { students });
    }
  }
  // used for rendering create student form
  renderForm(req, res) {
      res.render("pages/studentForm", { student: undefined });
  }

  // used for POST request from the form, and adding new student
  create(req, res) {
    const student = StudentsRepository.create(req.body);
    // redirect to new entry
    res.redirect(`/students/${student.id}`);
  }
  
  // used for POST request from the form, and updating student
  update(req, res) {
    const { studentId } = req.params;
    const student = StudentsRepository.update(studentId, req.body);
    // return the same form
    res.render("pages/studentForm", { student });
  }

  // used for DELETE request from the form
  delete(req, res) {
    const { studentId } = req.params;
    StudentsRepository.delete(studentId);
    // return to students list
    res.redirect("/students");
  }
}

module.exports = new StudentsController();
