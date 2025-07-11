class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong.",
        errors = [],
        stack = ""
    ) {
        super(message);

        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        this.success = false;
        this.name = "ApiError";

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };