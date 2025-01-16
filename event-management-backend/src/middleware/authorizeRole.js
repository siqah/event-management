import jwt from 'jsonwebtoken';


const authorizeRole = (requiredRole) => {
 
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization header is missing or malformed' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token is missing' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded || !decoded.role) {
        return res.status(401).json({ error: 'Invalid token payload' });
      }

      const userRole = decoded.role.toLowerCase();
      const allowedRoles = Array.isArray(requiredRole)
        ? requiredRole.map((role) => role.toLowerCase())
        : [requiredRole.toLowerCase()];

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ error: `Forbidden: Requires ${allowedRoles.join(' or ')} role` });
      }

      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: 'Token has expired' });
      } else if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      console.error('JWT Verification Error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
};

export default authorizeRole;