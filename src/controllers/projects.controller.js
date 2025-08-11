// controllers/projectController.js

import Project from '../models/projects.model.js';
import Joi from 'joi';
import handleMultipleUploads from '../utils/handleFileUpload.js';

const projectSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    techStack: Joi.array().items(Joi.string()).min(1).required(),
    liveLink: Joi.string().uri().optional().allow(''),
    repoLink: Joi.string().uri().optional().allow(''),
    images: Joi.array().items(Joi.string()).optional().max(5),
    videoLink: Joi.string().uri().optional().allow('')
});

export const createProject = async (req, res) => {
    try {
        // Convert techStack from comma-separated string to array if needed
        if (typeof req.body.techStack === 'string') {
            req.body.techStack = req.body.techStack.split(',').map(s => s.trim());
        }

        // Skip Joi errors caused by multipart empty fields
        if (!req.body.images) {
            req.body.images = [];
        }

        const { error } = projectSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                errors: error.details.map(err => err.message)
            });
        }

        let uploadedImageUrls = [];
        if (req.files && req.files.images) {
            const uploadedFiles = await handleMultipleUploads(req, 'image');
            if (uploadedFiles?.length > 0) {
                uploadedImageUrls = uploadedFiles
            }
        }



        const projectData = { ...req.body };
        if (uploadedImageUrls.length > 0) {
            projectData.images = uploadedImageUrls;
        }

        const newProject = await Project.create(projectData);

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: newProject
        });
    } catch (err) {
        console.error("Error creating project:", err);
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        res.status(200).json({
            success: true,
            data: project
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const updateProject = async (req, res) => {
    try {
        // Convert techStack from comma-separated string to array if needed
        if (typeof req.body.techStack === 'string') {
            req.body.techStack = req.body.techStack.split(',').map(s => s.trim());
        }

        // Validate input with Joi
        const { error } = projectSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                errors: error.details.map(err => err.message),
            });
        }

        // Find current project to get existing images
        const currentProject = await Project.findById(req.params.id);
        if (!currentProject) {
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        let uploadedImageUrls = [];
        if (req.files && req.files.images) {
            const uploadedFiles = await handleMultipleUploads(req, 'image');
            if (uploadedFiles?.length > 0) {
                uploadedImageUrls = uploadedFiles;
            }
        }

        // Prepare updateData starting from req.body
        const updateData = { ...req.body };

        // Append newly uploaded images to existing images
        if (uploadedImageUrls.length > 0) {
            // Combine existing images with newly uploaded ones
            updateData.images = [...(currentProject.images || []), ...uploadedImageUrls];
        } else if (Array.isArray(req.body.images)) {
            // If user explicitly sends images in req.body, override images with that
            updateData.images = req.body.images;
        } else {
            // Otherwise keep existing images unchanged by removing images from updateData
            delete updateData.images;
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Project updated successfully',
            data: updatedProject,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};




export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
