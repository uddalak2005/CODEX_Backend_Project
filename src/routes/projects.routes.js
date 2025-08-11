// routes/projectRoutes.js

import express from 'express';
import upload from '../middleware/upload.middleware.js';
import {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject
} from '../controllers/projects.controller.js';

const router = express.Router();

router.post(
    '/',
    upload.fields([{ name: 'images', maxCount: 5 }]),
    createProject
);

router.get('/', getAllProjects);

router.get('/:id', getProjectById);

router.put(
    '/:id',
    upload.fields([{ name: 'images', maxCount: 1 }]),
    updateProject
);


router.delete('/:id', deleteProject);

export default router;
