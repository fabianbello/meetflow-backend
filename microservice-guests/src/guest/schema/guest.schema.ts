import * as mongoose from 'mongoose';

export const GuestSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true}
    }
);

GuestSchema.index({email: 1}, { unique: true});