import { rateLimit } from 'express-rate-limit';

export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // 100 requests per IP per window
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        message: "Too many requests from this IP, please try again after 15 minutes",
    },
});

export const strictLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes
    limit: 20, // 20 requests per 30 minutes per IP
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        message: "Too many sensitive operations from this IP, please try again after 30 minutes",
    },
});
