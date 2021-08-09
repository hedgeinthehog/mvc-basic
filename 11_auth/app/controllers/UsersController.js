const jwt = require('jsonwebtoken');
const UsersRepository = require("../repositories/UsersRepository.js");

class usersController {
  renderForm(req, res) {
    const forms = {
      "/signup": "pages/signupForm",
      "/login": "pages/loginForm",
    }
    res.render(`${forms[req.path]}`);
  }

  async signup(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await UsersRepository.getOne({ username });
      if (Object.keys(user.getData()).length) return next({
        status: 409,
        message: 'User already exists',
      });

      await UsersRepository.create({ username, password });
      res.status(201).redirect("/users/login");
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await UsersRepository.getOne({ username });
      if (!Object.keys(user.getData()).length || !(await user.comparePasswords(password))) {
        return next({
          status: 400,
          message: 'User not found',
        });
      };

      const { SECRET_KEY } = process.env;
      const payload = {
        id: user.id,
        username
      }
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '500s' });
      res.send({ token });
    } catch (e) {
      next(e);
    }
  }

  async getCurrent(req, res) {
    const { username } = req.user;
    console.log(username);
    res.render('pages/privateRoute', { username });
  }
}

module.exports = new usersController();
