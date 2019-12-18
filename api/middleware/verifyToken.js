const jwt = require("jsonwebtoken"); 

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(`checking for valid token`);

  if (authorization) {
    const secret = process.env.JWT_SECRET || "Death Star Plans Secured";

    jwt.verify(authorization, secret, function(error, decodedToken) {
      if (error) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decodedToken;
        
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login and try again" });
  }
};