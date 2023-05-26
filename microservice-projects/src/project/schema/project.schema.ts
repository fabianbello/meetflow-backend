import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    projectDate: { type: Date, required: true },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'guests' }],
    userOwner: [{type: String}]
  },
  { timestamps: true },
);
ProjectSchema.index({ name: 1 }, { unique: true });
