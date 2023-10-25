import * as mongoose from 'mongoose';

export const PostMeetingSchema = new mongoose.Schema(
    {
        meeting: [{type: mongoose.Schema.Types.ObjectId, ref: 'meetings'}], // id de la reunión asociada
        meetingMinute: {type: String, required: false } // id del acta dialogica asociado
    },
    {
        timestamps: true,
    },
);

