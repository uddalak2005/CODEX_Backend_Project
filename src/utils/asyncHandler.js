
const asyncHandler=(requestHandler) => {
    return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err));
    }
}

// Saves you from using try catch every here and there, while doing database ,verification, fetching operations.

export {asyncHandler};