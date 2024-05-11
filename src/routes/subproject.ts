import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../model/Project';
import SubProject from '../model/SubProject';
import AppliedGig from '../model/AppliedGig';
import { isValidObjectId } from 'mongoose';

const router = express.Router();

// Route for applying for a subproject
router.post('/:projectId/subprojects/:subProjectId/apply', async (req: Request, res: Response) => {
    try {
        const { projectId, subProjectId } = req.params;
        if (!isValidObjectId(projectId) || !isValidObjectId(subProjectId)) {
            return res.status(400).json({ errors: 'Invalid project or subproject ID' });
        }

        const appliedGig = new AppliedGig({
            projectId,
            subProjectId,
            freelancerId: req.headers['userId'], // Assuming the user is authenticated and user ID is available in req.user.id
        });

        await appliedGig.save();
        res.status(201).json({ message: 'Applied for subproject successfully', appliedGig });
    } catch (error) {
        // console.error(error.message);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

// Route for approving or rejecting an application
router.patch('/:subProjectId/approve', async (req: Request, res: Response) => {
    try {
        const { subProjectId } = req.params;
        if (!isValidObjectId(subProjectId)) {
            return res.status(400).json({ errors: 'Invalid project or subproject ID' });
        }

        const { action, freelancerId } = req.body;
        if (!action || !['approve', 'reject'].includes(action)) {
            return res.status(400).json({ errors: 'Action must be either "approve" or "reject"' });
        }

        // Update status based on the action (approve or reject)
        const status = action === 'approve' ? 'Approved' : 'Rejected';
        const update = { status };

        // Update the applied gig with the status
        await AppliedGig.findOneAndDelete({subProjectId, freelancerId }, update);

        if(status){
            await SubProject.findByIdAndUpdate({subProjectId},{freelancerId, status: "Freelancer Hired"});
        }

        res.status(200).json({ message: `Application ${action}d successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

// Update status
router.patch('/:subProjectId/update', async (req: Request, res: Response) => {
    try {
        const { subProjectId } = req.params;
        if (!isValidObjectId(subProjectId)) {
            return res.status(400).json({ errors: 'Invalid project or subproject ID' });
        }

        const { freelancerId } = req.body;

        // Update status based on the action (approve or reject)
        const status = await SubProject.findById({_id: subProjectId});
        let action = status?.status;
        if(status?.status === 'Freelancer Hired'){
            action = "In Progress";
        }else if(status?.status === "In Progress"){
            action = "Completed";
        }
        const update = { action };

        await SubProject.findByIdAndUpdate({subProjectId},{status: action});


        res.status(200).json({ message: `Application ${action}d successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

export default router;