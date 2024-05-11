import { model, Schema, Document, Model } from "mongoose";

interface IFreelancerSkill extends Document {
    freelancerId: Schema.Types.ObjectId;
    skill: string;
}

const FreelancerSkillSchema: Schema = new Schema<IFreelancerSkill>({
    freelancerId: {
        type: Schema.Types.ObjectId,
        ref: "Freelancer",
        required: true,
    },
    skill: {
        type: String,
        required: true,
    },
});

// Create a compound index on freelancerId and skill fields
FreelancerSkillSchema.index({ freelancerId: 1, skill: 1 }, { unique: true });

const FreelancerSkill: Model<IFreelancerSkill> = model<IFreelancerSkill>(
    "FreelancerSkill",
    FreelancerSkillSchema
);

export default FreelancerSkill;
