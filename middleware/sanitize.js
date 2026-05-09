/**
 * Custom middleware to sanitize request data (body, query, params)
 * to prevent MongoDB Operator Injection.
 * This is a replacement for express-mongo-sanitize which is currently
 * incompatible with Express 5.
 */
const hasMongoOperator = (key) => key.startsWith('$') || key.includes('.');

const sanitizeObject = (obj) => {
    if (obj instanceof Object && !Array.isArray(obj)) {
        for (const key in obj) {
            if (hasMongoOperator(key)) {
                delete obj[key];
            } else if (obj[key] instanceof Object) {
                sanitizeObject(obj[key]);
            }
        }
    }
    return obj;
};

const sanitize = (req, res, next) => {
    if (req.body) sanitizeObject(req.body);
    if (req.params) sanitizeObject(req.params);
    
    // In Express 5, req.query is a getter. We need to handle it carefully.
    // We can't overwrite req.query, but we can sanitize the object it returns
    // or modify the underlying data if Express allows it.
    // For now, we'll iterate through the query keys.
    if (req.query) {
        for (const key in req.query) {
            if (hasMongoOperator(key)) {
                delete req.query[key];
            } else if (req.query[key] instanceof Object) {
                sanitizeObject(req.query[key]);
            }
        }
    }
    
    next();
};

export default sanitize;
