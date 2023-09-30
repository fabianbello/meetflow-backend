import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema(
  {
    shortName: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    projectDateI: { type: String, required: false },
    projectDateT: { type: String, required: false },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'guests' }],
    userOwner: [{type: String}],
    userMembers: [{type: String}]
  },
  { timestamps: true },
);
