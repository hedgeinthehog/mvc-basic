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
      if (user) return next({
        status: 409,
        message: 'User already exists',
      });

      await UsersRepository.create({ username, password });
      res.status(201).redirect("pages/loginForm");
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await UsersRepository.getOne({ username });
      if (!user || !user.comparePasswords(password)) {
        return res.status(400).send('No user found');
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
