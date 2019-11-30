const jwt = require("jsonwebtoken");

const models = require("../models");
const User = models.user;

// Fungsi untuk login
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    where: {
      email,
      password
    }
  })
    .then(login => {
      if (login) {
        const token = jwt.sign({ login }, "my-secret-key");
        res.json({
          userid: login.id,
          name: login.name,
          email: login.email,
          token
        });
      } else {
        res.status(422).json({
          message: "Bad Request"
        });
      }
    })
    .catch(error => console.log(error));
};

// Fungsi untuk register user
exports.register = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const role = req.body.role;
  const password = req.body.password;
  if (req.role !== 1) {
    res.status(403).json({ messege: "Forbidden Access" });
  } else {
    User.findOne({ where: { email: email } })
      .then(respon => {
        if (respon) {
          res.json({
            message: "Email already in Use"
          });
        } else {
          User.create({ email, name, role, password })
            .then(() => {
              res.status(200).json({
                message: "success"
              });
            })
            .catch(err => {
              console.log(err);
            });
        }

        console.log(respon);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
