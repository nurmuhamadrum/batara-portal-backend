const jwt = require("jsonwebtoken");

exports.authenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.status(401).send({ message: "Unauthorized" });
  }

  jwt.verify(token, "my-secret-key", (err, user) => {
    if (err) {
      return res.status(403).send({ message: "Your Token is Not Valid" });
    }
    req.role = user.login.role;
    req.userId = user.login.id;
    next();
  });
};

exports.autorized = (req, res, next) => {
  if (req.role === 3) {
    res.status(401).send({ message: "Unauthorized" });
  } else {
    next();
  }
};
