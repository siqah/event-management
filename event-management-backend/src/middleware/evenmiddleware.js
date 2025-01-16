

const eventMiddleware = (req, res, next) => {
    console.log(`Event Middleware: ${req.method} ${req.url}`);
        if (!req.isAuthenticated()) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    // Continue to the next middleware or route handler
    next();
};

module.exports = eventMiddleware;