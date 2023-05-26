import * as mongoose from 'mongoose';

export const MeetingSchema = new mongoose.Schema(
    {
        name: {type: String, required: true },
        description: {type: String, required: true},
        number: {type: Number, required: true},
        project: [{type: mongoose.Schema.Types.ObjectId, ref: 'projects'}]
    },
    {
        timestamps: true,
    },
);

