import jwt from 'jsonwebtoken';

/**
 * Middleware to authorize a user based on their role.
 * @param {string|string[]} requiredRole - The role(s) required to access the route.
 * @returns {Function} Express middleware function.
 */
const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    try {
      // Extract the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header is missing or malformed' });
      }

      // Extract and validate the token
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
      }

      // Verify the token and decode the payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded.role) {
        return res.status(401).json({ error: 'Invalid token payload' });
      }

      // Normalize and validate the user's role
      const userRole = decoded.role.toLowerCase();
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole.map((role) => role.toLowerCase())
        : [requiredRole.toLowerCase()];

      if (!allowedRoles.includes(userRole)) {
        return res
          .status(403)
          .json({ error: `Forbidden: Requires ${allowedRoles.join(' or ')} role(s)` });
      }

      // Attach user data to the request for downstream processing
      req.user = decoded;
      next();
    } catch (error) {
      // Handle specific JWT errors
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: 'Token has expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Log unexpected errors and return a generic error response
      console.error('JWT Verification Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};

export default authorizeRole;
