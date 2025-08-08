import managedUser from "../models/managedUser.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// CREATE a new managed user
const createManagedUser = asyncHandler(async (req, res) => {
    const { userName, userEmail, joiningDate, status, year, role } = req.body;

    if (!userName || !userEmail || !joiningDate || !status || !year || !role) {
        throw new ApiError(400, "All fields are required.");
    }

    const user = await managedUser.create({
        userName,
        userEmail,
        joiningDate,
        status,
        year,
        role,
    });

    return res
        .status(201)
        .json(new ApiResponse(201, user, "User created successfully."));
});

// GET all managed users
const getAllManagedUsers = asyncHandler(async (req, res) => {
    const users = await managedUser.find();

    if (users.length === 0) {
        throw new ApiError(404, "No users found.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, users, "Users fetched successfully."));
});

// GET single managed user by ID
const getManagedUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await managedUser.findById(id);

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully."));
});

// DELETE a managed user by ID
const deleteManagedUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await managedUser.findByIdAndDelete(id);

    if (!user) {
        throw new ApiError(404, "User not found or already deleted.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User deleted successfully."));
});

export {
    createManagedUser,
    getAllManagedUsers,
    getManagedUserById,
    deleteManagedUser
};
