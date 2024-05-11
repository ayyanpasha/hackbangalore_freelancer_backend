import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../model/Project';
import SubProject from '../model/SubProject';
import AppliedGig from '../model/AppliedGig';
import { isValidObjectId } from 'mongoose';

const router = express.Router();

// Route for creating a new project
router.post('/create', [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required')
], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description} = req.body;
        const project = new Project({
            title,
            description,
            client: req.headers['userId'], // Assuming the user is authenticated and user ID is available in req.user.id
        });

        await project.save();
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

// Route for creating subprojects under a project
router.post('/:projectId/subprojects', [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('pricing').isNumeric().withMessage('Pricing must be a number'),
    body('fixed').isBoolean().withMessage('Fixed is error'),
], async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const projectId = req.params.projectId;
        if (!isValidObjectId(projectId)) {
            return res.status(400).json({ errors: 'Invalid project ID' });
        }

        const { title, description, pricing, fixed } = req.body;
        const subProject = new SubProject({
            projectId,
            title,
            description,
            pricing,
        });

        await subProject.save();
        res.status(201).json({ message: 'Subproject created successfully', subProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});


export default router;
