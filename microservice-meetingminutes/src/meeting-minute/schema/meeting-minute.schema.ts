import * as mongoose from 'mongoose';

export const MeetingMinuteSchema = new mongoose.Schema({
  title: { type: String, required: false },
  place: { type: String, required: false },
  startTime: { type: String, required: false },
  endTime: { type: String, required: false },
  endHour: { type: String, required: false },
  startHour: { type: String, required: false },
  /* topics: [
    {
      description: String,
      artifact: [{ specification: String, mode: String, responsible: String }],
    },
  ], */
  topics: [{type: String}],
  participants: [{type: String}],
  assistants: [{type: String}],
  secretaries: [{type: String}],
  leaders: [{type: String}],
  links: [{type: String}],
  realStartTime: {type: String},
  realEndTime: {type: String},
  number: { type: Number, required: false },
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'meetings' },
 /*  meeting: { type: String, required: false }, */
/*   topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'topics' } ], */

});
MeetingMinuteSchema.index({ id: 1 }, { unique: false });
