import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import fetchUser from '../middleware/fetchUser';
import Client from '../model/Client';
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
        const client = await Client.findOne({ _id: userId }).select("-password");
        if (!client) {
            return res.status(404).json({ errors: "Freelancer not found" });
        }
        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

// ROUTE 2: Get Previous Work
router.get('/previouswork', async (req: Request, res: Response) => {
    try {
        const userId = req.headers['userId'];
        const getPreviousWork = await CompletedProject.find({clientId: userId}).populate('SubProject').exec();
        res.json(getPreviousWork);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
});

export default router;