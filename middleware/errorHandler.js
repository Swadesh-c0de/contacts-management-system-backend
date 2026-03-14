import constants from "../constants.js";

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            // This default case should ideally not be hit if all error constants are covered.
            // If it is hit, it means an unhandled status code was encountered.
            // For robustness, we can treat it as a generic server error if it's an error code.
            // The initial statusCode assignment already defaults to 500 if res.statusCode < 400.
            // So, if we reach here, it's a status code that wasn't explicitly mapped in the switch.
            // For now, keep the original default behavior as the instruction was about 500 handling,
            // which is covered by the statusCode assignment and SERVER_ERROR case.
            console.log("No Error, All good!!");
            break;
    }
}

export default errorHandler;