import * as mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema({
    shortName: { type: String, required: false },
})