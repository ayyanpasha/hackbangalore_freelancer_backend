import { model, Schema, Document, Model } from "mongoose";

interface IFreelancer extends Document {
  email: string;
  password: string;
  bio: string;
  title: string;
  rate: number;
  date: Date;
}

const FreelancerSchema: Schema = new Schema<IFreelancer>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  title: {
    type: String,
  },
  rate: {
    type: Number,
    default: 700,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Freelancer: Model<IFreelancer> = model<IFreelancer>(
  "Freelancer",
  FreelancerSchema
);
Freelancer.createIndexes();
export default Freelancer;
