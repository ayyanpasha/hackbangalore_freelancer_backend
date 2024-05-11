import { model, Schema, Document, Model } from "mongoose";

interface IClient extends Document {
  email: string;
  password: string;
  date: Date;
}

const ClientSchema: Schema = new Schema<IClient>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Client: Model<IClient> = model<IClient>("Client", ClientSchema);
Client.createIndexes();
export default Client;
