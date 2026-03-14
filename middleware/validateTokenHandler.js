import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    // console.log(authHeader);
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        res.status(401).json({ errorMessage: "User is not authorized or token is missing" });
        throw new Error("User is not authorized or token is missing");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ errorMessage: "User is not authorized" });
            throw new Error("User is not authorized");
        }
        req.user = decoded.user;
        next();
    });
})

export default validateToken;