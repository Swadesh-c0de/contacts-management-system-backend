import { rateLimit } from 'express-rate-limit';

// Global rate limiter configuration
// Applies a reasonable limit to general API endpoints to prevent abuse.
// Routes: GET /api/contacts, GET /api/contacts/:id
export const globalLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    limit: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    standardHeaders: 'draft-7', // combined `RateLimit` header
    legacyHeaders: false, // disable `X-RateLimit-*` headers
    message: {
        status: 429,
        success: false,
        message: "Too many requests from this IP, please try again later",
    },
});

// Strict rate limiter configuration
// Used for sensitive routes like authentication and password resets.
// Routes: POST /api/contacts, PUT /api/contacts/:id, DELETE /api/contacts/:id
export const strictLimiter = rateLimit({
    windowMs: parseInt(process.env.STRICT_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    limit: parseInt(process.env.STRICT_RATE_LIMIT_MAX) || 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
        status: 429,
        success: false,
        message: "Too many sensitive operations from this IP, please try again after 15 minutes",
    },
});
