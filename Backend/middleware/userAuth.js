import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.userId;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });

    }
};

export default userAuth;