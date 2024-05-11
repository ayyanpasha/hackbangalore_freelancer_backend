import { model, Schema, Document, Model } from "mongoose";

interface IProject extends Document {
  clientId: Schema.Types.ObjectId;
  title: string;
  description: string;
}

const ProjectSchema: Schema = new Schema<IProject>({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Project: Model<IProject> = model<IProject>("Project", ProjectSchema);
Project.createIndexes();
export default Project;
