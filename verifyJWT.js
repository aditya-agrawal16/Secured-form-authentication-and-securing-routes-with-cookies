const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const tkn = req.headers.authorization;

  if (typeof tkn !== "undefined") {
    jwt.verify(tkn, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).send("error");
      }
      req.authorizedUser = decoded;
      next();
    });
  } else {
    return res.status(403).send("error");
  }
};
