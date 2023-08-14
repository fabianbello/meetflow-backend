import * as mongoose from 'mongoose';

export const elementSchema = new mongoose.Schema(
    {
     /*    name: {type: String, required: true },
        description: {type: String, required: true}, */
        description: {type: String, required: true},
        type:  {type: String, required: false },
        participants:  {type: String, required: false },
        topic:  {type: Number, required: false },
        meeting: [{type: mongoose.Schema.Types.ObjectId, ref: 'meetings'}],
        project: [{type: mongoose.Schema.Types.ObjectId, ref: 'projects'}],
        meetingMinute: {type: String, required: false },
        state: {type: String, required: false },
        number: {type: Number, required: false },
        dateLimit: {type: String, required: false },
        position: {type: String, required: false },
    },
    {
        timestamps: true,
    },
);

