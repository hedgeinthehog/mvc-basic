const StudentsRepository = require("../repositories/StudentsRepository");

class StudentsController {
    // used for students list and individual student page
  async getAll(_, res, next) {
    try {
      const students = await StudentsRepository.getAll();
      res.render('pages/students', { students } );
    } catch (e) {
      next(e);
    }
  };

  async getOne(req, res, next) {
    const { studentId } = req.params;
    try {
      const student = await StudentsRepository.getById(studentId);
      if (student) {
        res.render('pages/student', { student });
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  // used for rendering create student form
  renderForm(req, res) {
      res.render("pages/studentForm", { student: undefined });
  }

  // used for POST request from the form, and adding new student
  async create(req, res) {
    const student = await StudentsRepository.create(req.body);
    // redirect to new entry
    res.redirect(`/students/${student.id}`);
  }
  
  // used for POST request from the form, and updating student
  async update(req, res) {
    const { studentId } = req.params;
    const student = await StudentsRepository.update(studentId, req.body);
    // return the same form
    res.render("pages/studentForm", { student });
  }

  // used for DELETE request from the form
  async delete(req, res) {
    const { studentId } = req.params;
    await StudentsRepository.delete(studentId);
    // return to students list
    res.redirect("/students");
  }
}

module.exports = new StudentsController();
