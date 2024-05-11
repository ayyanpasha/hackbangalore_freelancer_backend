import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import connectToDb from './db.js';
import authFreelanceRoutes from './routes/authFreelance.js';
import authClientRoutes from './routes/authClient.js';
import freelanceRoutes from './routes/freelancer.js';
import clientRoutes from './routes/client.js';
import projectRoutes from './routes/project.js';
import subprojectRoutes from './routes/subproject.js';
// import documentRequestRoutes from './routes/documentRequest.js';
// import documentPermissionRoutes from './routes/documentPermission.js';
// import documentAdminRoutes from './routes/documentAdmin.js';
// import documentRoutes from './routes/document.js';


// Connect to the database
connectToDb();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth/freelancer', authFreelanceRoutes);
app.use('/api/auth/client', authClientRoutes);
app.use('/api/freelancer', freelanceRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/subproject', subprojectRoutes);
// app.use('/api/document/request', documentRequestRoutes);
// app.use('/api/document/permission', documentPermissionRoutes);
// app.use('/api/document/admin', documentAdminRoutes);
// app.use('/api/document', documentRoutes);

// Start the server
const PORT = process.env.EXPRESS_PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});