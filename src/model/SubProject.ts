import { model, Schema, Document, Model } from "mongoose";

interface ISubProject extends Document {
  projectId: Schema.Types.ObjectId;
  clientId: Schema.Types.ObjectId;
  freelancerId: Schema.Types.ObjectId | undefined;
  title: string;
  description: string;
  fixed: boolean;
  pricing: number;
  status: string;
}

const SubProjectSchema: Schema = new Schema<ISubProject>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  freelancerId: {
    type: Schema.Types.ObjectId,
    ref: 'Freelancer'
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fixed: {
    type: Boolean,
    default: false,
  },
  pricing: {
    type: Number,
    default: 700,
  },
  status: {
    type: String,
    default: "Open for Bidding"
  }
});

const SubProject: Model<ISubProject> = model<ISubProject>(
  "SubProject",
  SubProjectSchema
);
SubProject.createIndexes();
export default SubProject;
