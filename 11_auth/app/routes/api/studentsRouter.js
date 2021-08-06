var express = require('express');
var router = express.Router();

const studentsController = require('../../controllers/StudentsController');

router.get('/', studentsController.getAll);
router.get('/create', studentsController.renderForm)
  .post('/create', studentsController.create);
router.get('/:studentId', studentsController.getOne)
  .post('/:studentId', studentsController.update);
router.post('/delete/:studentId', studentsController.delete);

module.exports = router;