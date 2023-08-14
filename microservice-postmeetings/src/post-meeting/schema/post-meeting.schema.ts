import * as mongoose from 'mongoose';

export const PostMeetingSchema = new mongoose.Schema(
    {
     /*    name: {type: String, required: true },
        description: {type: String, required: true}, */
        meeting: [{type: mongoose.Schema.Types.ObjectId, ref: 'meetings'}],
        meetingMinute: {type: String, required: false }

    },
    {
        timestamps: true,
    },
);

