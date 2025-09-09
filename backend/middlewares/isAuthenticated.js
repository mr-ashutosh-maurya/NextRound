import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  try {
    let token;

    // Check token from cookie or authorization header
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach user ID to request object
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};
