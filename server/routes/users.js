const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const auth = require('../auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/auth', auth, async (req, res) => {
  try {
    let { user } = req;
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post(
  '/login',
  [
    check('email', 'Please include a valid email.').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    // console.log(req.body);

    const errors = validationResult(req);
    // console.log(errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findAll({ where: { email: email.toLowerCase() } });
      //   let user = await User.findOne({ email: email.toLowerCase() });
      // console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(
        password,
        user[0].dataValues.password
      );

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user[0].dataValues.id,
          name: user[0].dataValues.name,
          email: user[0].dataValues.email
        }
      };

      // console.log(payload.user);

      jwt.sign(
        payload,
        process.env.jwtToken,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          let now = new Date();
          now.setTime(now.getTime() + 3600000);
          let expires = now.toUTCString();
          let cookie =
            'token=' + token + '; Expires=' + expires + '; Path=/; HttpOnly';
          res.setHeader('Set-Cookie', cookie);
          res.send(JSON.stringify({ token, user: payload.user, expires }));
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
