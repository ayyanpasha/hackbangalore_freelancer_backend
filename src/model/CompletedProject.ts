import { model, Schema, Document, Model } from "mongoose";

interface ICompletedProject extends Document {
    project: Schema.Types.ObjectId;
    freelancerId: Schema.Types.ObjectId;
    clientId: Schema.Types.ObjectId;
    clientRating: number;
    clientReview: string;
    completedAt: Date;
}

const CompletedProjectSchema: Schema = new Schema<ICompletedProject>({
    project: {
        type: Schema.Types.ObjectId,
        ref: "SubProject", // Reference to the SubProject model, adjust as needed
        required: true,
    },
    freelancerId: {
        type: Schema.Types.ObjectId,
        ref: "Freelancer", // Reference to the Freelancer model, adjust as needed
        required: true,
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client", // Reference to the Freelancer model, adjust as needed
        required: true,
    },
    clientRating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
    },
    clientReview: {
        type: String,
    },
    completedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

const CompletedProject: Model<ICompletedProject> = model<ICompletedProject>(
    "CompletedProject",
    CompletedProjectSchema
);

export default CompletedProject;
