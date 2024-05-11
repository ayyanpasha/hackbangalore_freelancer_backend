import { model, Schema, Document, Model } from "mongoose";

interface IAppliedGig extends Document {
  projectId: Schema.Types.ObjectId;
  subprojectId: Schema.Types.ObjectId;
  freelancerId: Schema.Types.ObjectId;
}

const AppliedGigSchema: Schema = new Schema<IAppliedGig>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  subprojectId: {
    type: Schema.Types.ObjectId,
    ref: "SubProject",
  },
  freelancerId: {
    type: Schema.Types.ObjectId,
    ref: 'Freelancer'
  },
});

const AppliedGig: Model<IAppliedGig> = model<IAppliedGig>(
  "AppliedGig",
  AppliedGigSchema
);
AppliedGig.createIndexes();
export default AppliedGig;
