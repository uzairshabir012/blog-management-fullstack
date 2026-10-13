const jwt = require("jsonwebtoken");

function authUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (err) {
        console.error("Auth User Error:", err);

        return res.status(401).json({
            message: "Unauthorized: Invalid token"
        });
    }
}

function authAuthor(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "author") {
            return res.status(403).json({
                message: "You don't have access to create blog"
            });
        }

        req.user = decoded;
        next();

    } catch (err) {
        console.error("Auth Author Error:", err);

        return res.status(401).json({
            message: "Unauthorized: Invalid token"
        });
    }
}

module.exports = {
    authUser,
    authAuthor
};