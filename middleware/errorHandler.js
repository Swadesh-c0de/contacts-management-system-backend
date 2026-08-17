import constants from "../constants.js";

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    // Handle Mongoose CastError (invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(constants.VALIDATION_ERROR).json({
            title: "Validation Failed",
            message: `Invalid ID format for field '${err.path}'`,
            stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
        });
    }

    // Handle Mongoose Schema ValidationError
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        return res.status(constants.VALIDATION_ERROR).json({
            title: "Validation Failed",
            message: message || err.message,
            stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
        });
    }

    // Handle MongoDB duplicate key error (code 11000)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || 'field';
        return res.status(constants.VALIDATION_ERROR).json({
            title: "Validation Failed",
            message: `Duplicate value entered for ${field}`,
            stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
        });
    }

    const statusCode = res.statusCode < 400 ? constants.SERVER_ERROR : res.statusCode;
    res.status(statusCode);

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;
        case constants.SERVER_ERROR:
        default:
            res.json({
                title: "Server Error",
                message: err.message || "An unexpected error occurred",
                stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
            });
            break;
    }
};

export default errorHandler;