import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECERT_KEY, (err) => {
    if (err) return res.sendStatus(403);
    next();
  });
}

export default authenticateToken;
