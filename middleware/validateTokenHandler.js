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
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401);
        throw new Error("User is not authorized");
    }
})

export default validateToken;