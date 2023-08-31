import * as mongoose from 'mongoose';

export const notificationSchema = new mongoose.Schema({
    type: { type: String, required: false },
    description: {type: String, required: false},
})