import * as mongoose from 'mongoose';

export const notificationSchema = new mongoose.Schema({
    type: { type: String, required: false }, // tipo de notificación 
    description: {type: String, required: false}, // descripción
})