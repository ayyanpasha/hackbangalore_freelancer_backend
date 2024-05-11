import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import fetchUser from '../middleware/fetchUser';
import Freelancer from '../model/Freelancer';
import FreelancerSkill from '../model/FreelancerSkills'; // Import FreelancerSkill model if not already imported
import AppliedGig from '../model/AppliedGig'; // Import AppliedGig model if not already imported
import dotenv from 'dotenv';
import CompletedProject from '../model/CompletedProject';

dotenv.config();

const router = express.Router();

// Middleware to fetch authenticated user
router.use(fetchUser);

// ROUTE 1: Get freelancer profile information
router.get('/profile', async (req: Request, res: Response) => {
    try {
        const userId = req.headers['userId'];
        const freelancer = await Freelancer.findOne({ _id: userId }).select("-password");
        if (!freelancer) {
            return res.status(404).json({ errors: "Freelancer not found" });
        }
        const skills = await FreelancerSkill.find({freelancerId: freelancer._id.toString()});
        res.json({...freelancer, skills});
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

// ROUTE 2: Update freelancer bio
router.put('/bio', [
    body('bio').trim().notEmpty().withMessage("Bio cannot be empty"),
], async (req: Request, res: Response) => {
    try {
        const userId = req.headers['userId'];
        const { bio } = req.body;

        const updatedFreelancer = await Freelancer.findByIdAndUpdate(userId, { bio }, { new: true });

        if (!updatedFreelancer) {
            return res.status(404).json({ errors: "Freelancer not found" });
        }

        res.json(updatedFreelancer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

// ROUTE 3: Add or update freelancer skills
router.post('/skills', [
    body('skills').isArray().withMessage("Skills must be an array"),
], async (req: Request, res: Response) => {
    try {
        const userId = req.headers['userId'];
        const { skills } = req.body;

        // Check if skills array is provided
        if (!Array.isArray(skills)) {
            return res.status(400).json({ errors: "Skills must be provided as an array" });
        }

        // Add skills
        const skillDocuments = skills.map((skill: string) => ({
            freelancerId: userId,
            skill,
        }));
        await FreelancerSkill.insertMany(skillDocuments);

        res.status(201).json({ message: "Skills updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});


// ROUTE 4: Delete freelancer skills
router.delete('/skills', [
    body('skills').isArray().withMessage("Skills must be an array"),
], async (req: Request, res: Response) => {
    try {
        const userId = req.headers['userId'];
        const { skillId } = req.body;

        await FreelancerSkill.findByIdAndDelete({_id: skillId});

        res.status(201).json({ message: "Skills updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

// ROUTE 5: Update freelancer title
router.put('/title', [
    body('title').trim().notEmpty().withMessage("Title cannot be empty"),
], async (req: Request, res: Response) => {
    try {
        const userId = req.headers['userId'];
        const { title } = req.body;

        const updatedFreelancer = await Freelancer.findByIdAndUpdate(userId, { title }, { new: true });

        if (!updatedFreelancer) {
            return res.status(404).json({ errors: "Freelancer not found" });
        }

        res.json(updatedFreelancer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

// ROUTE 6: Update freelancer bio
router.put('/rate', [
    body('rate').trim().notEmpty().isNumeric().withMessage("rate cannot be empty"),
], async (req: Request, res: Response) => {
    try {
        const userId = req.headers['userId'];
        const { rate } = req.body;

        const updatedFreelancer = await Freelancer.findByIdAndUpdate(userId, { rate }, { new: true });

        if (!updatedFreelancer) {
            return res.status(404).json({ errors: "Freelancer not found" });
        }

        res.json(updatedFreelancer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

// ROUTE 7: Get Previous Work
router.get('/previouswork', async (req: Request, res: Response) => {
    try {
        const userId = req.headers['userId'];
        const getPreviousWork = await CompletedProject.find({freelancer: userId}).populate('SubProject').exec();
        res.json(getPreviousWork);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

export default router;