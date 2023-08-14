import * as mongoose from 'mongoose';

export const reminderSchema = new mongoose.Schema({
    name: {type: String, required: false},
    email: {type: String, required: true},
    type: { type: String, required: false },
    time: { type: String, required: false },
    remember: { type: String, required: false },
    milisec: { type: Number, required: false },
})